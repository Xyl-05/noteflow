<?php
$db = new PDO('sqlite:data/database.sqlite');

echo "=== Notes ===\n";
$notes = $db->query('SELECT * FROM notes');
foreach ($notes as $note) {
    echo 'ID: ' . $note['id'] . ' | Title: ' . $note['title'] . ' | Tags: ' . $note['tags'] . "\n";
}

echo "\n=== Contacts ===\n";
$contacts = $db->query('SELECT * FROM contacts');
foreach ($contacts as $c) {
    echo 'ID: ' . $c['id'] . ' | Name: ' . $c['name'] . ' | Email: ' . $c['email'] . ' | Message: ' . $c['message'] . "\n";
}
