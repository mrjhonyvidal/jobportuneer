# Jobportuneer

Jobportuneer is a modern job portal that makes job searching and applying easy.
The app includes user login, job listings, application tracking, and more.

## Stack

- React
- Next.js
- [Shadcn UI](https://ui.shadcn.com/)
- TailwindCSS and DaisyUI
- Clerkjs Auth
- Render.com (DB PostgreSQL)
- Prisma ORM

# Prisma Development Commands

This project uses Prisma as the ORM. Below are the essential Prisma commands for schema management, database migrations, and other related tasks.

---

## **Prisma Commands**

### **1. Generating the Prisma Client**

Run this command whenever you update the `schema.prisma` file to regenerate the Prisma Client:

```bash
npx prisma generate
```

**Purpose**: Updates the Prisma Client with the latest changes from the `schema.prisma` file.

---

### **2. Applying Migrations**

Whenever you make changes to your schema and need to apply them to the database:

```bash
npx prisma migrate dev --name <migration_name>
```

Replace `<migration_name>` with a descriptive name for the changes. For example:

```bash
npx prisma migrate dev --name update_relationships
```

**Purpose**: Applies schema changes to your local database and creates a migration file for tracking.

---

### **3. Introspecting the Database**

If you want to reverse-engineer an existing database into a Prisma schema:

```bash
npx prisma db pull
```

**Purpose**: Updates the `schema.prisma` file to match the database schema.

---

### **4. Pushing Schema Changes**

If you want to sync your `schema.prisma` changes directly to the database without creating a migration (use cautiously in production environments):

```bash
npx prisma db push
```

**Purpose**: Pushes changes to the database without creating a migration. Use for prototyping only.

---

### **5. Resetting the Database**

To reset your database and apply all migrations from scratch:

```bash
npx prisma migrate reset
```

**Purpose**: Deletes all data and re-applies migrations. **Use with caution**, as this will wipe your database.

---

### **6. Opening Prisma Studio**

To inspect and manage your database through a web UI:

```bash
npx prisma studio
```

**Purpose**: Opens a graphical interface to explore and manipulate database records.

---

## **Workflow Examples**

### **When Adding a New Field**

1. Update `schema.prisma` with the new field.
2. Generate a migration:
   ```bash
   npx prisma migrate dev --name add_new_field
   ```
3. Regenerate the Prisma Client:
   ```bash
   npx prisma generate
   ```

---

### **When Updating Relationships**

1. Modify the relationships in `schema.prisma`.
2. Generate a migration:
   ```bash
   npx prisma migrate dev --name update_relationships
   ```
3. Regenerate the Prisma Client:
   ```bash
   npx prisma generate
   ```

---

### **When Syncing with an Existing Database**

1. Pull the database schema:
   ```bash
   npx prisma db pull
   ```
2. Update the `schema.prisma` file manually if needed.
3. Regenerate the Prisma Client:
   ```bash
   npx prisma generate
   ```

---

### **When Resetting the Database**

1. Reset the database:
   ```bash
   npx prisma migrate reset
   ```
2. Apply all migrations from scratch.

---

## **Best Practices**

- Always commit your migrations (the `/prisma/migrations` folder) to version control.
- Use descriptive migration names to document schema changes clearly.
- Test migrations in a staging environment before applying to production.
- Run `npx prisma db pull` regularly to ensure the `schema.prisma` file is in sync with the database.

---

## **Additional Resources**

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma CLI Commands](https://www.prisma.io/docs/reference/api-reference/command-reference)
- [Prisma Studio](https://www.prisma.io/studio)
