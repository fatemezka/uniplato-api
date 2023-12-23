-- Insert some sample data into category table
INSERT INTO `Category`
	(`id`, `title`, `score`, `latitude`, `longitude`, `createdAt`, `updatedAt`) 
VALUES 
    (UUID(), "Animal", 400, NULL, NULL, CURRENT_TIMESTAMP, NULL),
    (UUID(), "Flower", 1000, NULL, NULL, CURRENT_TIMESTAMP, NULL),
    (UUID(), "Food", 920, NULL, NULL, CURRENT_TIMESTAMP, NULL),
    (UUID(), "Human", 3400, NULL, NULL, CURRENT_TIMESTAMP, NULL);