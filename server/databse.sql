CREATE TABLE "tasks" (
	"id" serial primary key,
	"task" VARCHAR(200) not null,
	"complete" BOOLEAN DEFAULT FALSE
);

--SAMPLE STARTER DATA
INSERT INTO "tasks" 
	("task", "complete") 
VALUES 
('Sweeping',false),
('Dishes',false),
('Weeding',false),
('Exercise',false),
('Meal Prep',false),
('Studying',true);

--GET (Select from table)
SELECT * FROM "tasks"
ORDER BY "complete" ASC;

--POST (INSERT)
INSERT INTO "tasks" 
	("task", "complete");
	
--PUT (UPDATE)
UPDATE "tasks"
SET "complete" = TRUE
WHERE "id"=1; --$1

--DELETE (DELETE)
DELETE FROM "tasks" WHERE "id"=1; --$1