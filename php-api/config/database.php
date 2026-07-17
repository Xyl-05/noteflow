<?php
class Database {
    private static $instance = null;
    private $pdo;

    private function __construct() {
        $dbPath = dirname(__DIR__) . '/data/database.sqlite';
        
        if (!file_exists(dirname($dbPath))) {
            mkdir(dirname($dbPath), 0755, true);
        }

        try {
            $this->pdo = new PDO('sqlite:' . $dbPath);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->pdo;
    }

    public function init() {
        $sql = <<<'SQL'
CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    tags TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO notes (id, title, content, tags, created_at, updated_at) VALUES
(1, '欢迎使用 NoteFlow', '这是你的第一条笔记，开始记录你的想法吧！NoteFlow 帮助你高效管理和整理笔记内容。', '["入门","指南"]', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(2, '项目开发计划', '本周任务：\n1. 完成前端组件开发\n2. 实现后端 API\n3. 编写测试用例\n4. 部署上线', '["工作","计划"]', '2024-01-02 10:30:00', '2024-01-02 10:30:00'),
(3, '学习笔记：React Hooks', 'useState：用于在函数组件中添加状态\nuseEffect：用于处理副作用\nuseContext：用于跨组件传递数据\nuseReducer：用于复杂状态管理', '["学习","React"]', '2024-01-03 14:20:00', '2024-01-03 14:20:00'),
(4, '今日待办事项', '- 完成项目报告\n- 回复邮件\n- 整理文档\n- 代码审查', '["日常","待办"]', '2024-01-04 09:00:00', '2024-01-04 09:00:00');
SQL;

        try {
            $this->pdo->exec($sql);
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
}
