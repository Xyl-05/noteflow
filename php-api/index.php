<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require_once 'config/database.php';

$db = Database::getInstance();
$db->init();
$pdo = $db->getConnection();

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if (preg_match('/^\/api\/notes(\/(\d+))?$/', $requestUri, $matches)) {
    $noteId = isset($matches[2]) ? (int)$matches[2] : null;
    
    switch ($requestMethod) {
        case 'GET':
            if ($noteId) {
                $stmt = $pdo->prepare('SELECT * FROM notes WHERE id = ?');
                $stmt->execute([$noteId]);
                $note = $stmt->fetch();
                if ($note) {
                    $note['tags'] = json_decode($note['tags'] ?: '[]', true);
                    echo json_encode(['note' => $note]);
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Note not found']);
                }
            } else {
                $stmt = $pdo->query('SELECT * FROM notes ORDER BY created_at DESC');
                $notes = $stmt->fetchAll();
                foreach ($notes as &$note) {
                    $note['tags'] = json_decode($note['tags'] ?: '[]', true);
                }
                echo json_encode(['notes' => $notes]);
            }
            break;

        case 'POST':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['title'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Title is required']);
                break;
            }
            $stmt = $pdo->prepare('INSERT INTO notes (title, content, tags, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)');
            $stmt->execute([
                $data['title'],
                $data['content'] ?: '',
                json_encode($data['tags'] ?: [])
            ]);
            $id = $pdo->lastInsertId();
            $stmt = $pdo->prepare('SELECT * FROM notes WHERE id = ?');
            $stmt->execute([$id]);
            $note = $stmt->fetch();
            $note['tags'] = json_decode($note['tags'] ?: '[]', true);
            echo json_encode(['note' => $note]);
            break;

        case 'PUT':
            if (!$noteId) {
                http_response_code(400);
                echo json_encode(['error' => 'Note ID is required']);
                break;
            }
            $data = json_decode(file_get_contents('php://input'), true);
            $fields = [];
            $params = [];
            if (isset($data['title'])) {
                $fields[] = 'title = ?';
                $params[] = $data['title'];
            }
            if (isset($data['content'])) {
                $fields[] = 'content = ?';
                $params[] = $data['content'];
            }
            if (isset($data['tags'])) {
                $fields[] = 'tags = ?';
                $params[] = json_encode($data['tags']);
            }
            $fields[] = 'updated_at = CURRENT_TIMESTAMP';
            $params[] = $noteId;
            
            if (empty($fields)) {
                http_response_code(400);
                echo json_encode(['error' => 'No fields to update']);
                break;
            }
            
            $stmt = $pdo->prepare('UPDATE notes SET ' . implode(', ', $fields) . ' WHERE id = ?');
            $stmt->execute($params);
            
            $stmt = $pdo->prepare('SELECT * FROM notes WHERE id = ?');
            $stmt->execute([$noteId]);
            $note = $stmt->fetch();
            if ($note) {
                $note['tags'] = json_decode($note['tags'] ?: '[]', true);
                echo json_encode(['note' => $note]);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Note not found']);
            }
            break;

        case 'DELETE':
            if (!$noteId) {
                http_response_code(400);
                echo json_encode(['error' => 'Note ID is required']);
                break;
            }
            $stmt = $pdo->prepare('DELETE FROM notes WHERE id = ?');
            $stmt->execute([$noteId]);
            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'Note deleted successfully']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Note not found']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
    }
} elseif ($requestUri === '/api/contact') {
    if ($requestMethod === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['name'], $data['email'], $data['message'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name, email, and message are required']);
            exit();
        }
        $stmt = $pdo->prepare('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)');
        $stmt->execute([$data['name'], $data['email'], $data['message']]);
        echo json_encode(['message' => 'Contact message received successfully']);
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
} elseif ($requestUri === '/api/health') {
    echo json_encode(['status' => 'ok', 'message' => 'NoteFlow PHP API is running!']);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}
