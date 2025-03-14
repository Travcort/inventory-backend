# Inventory Backend
## How to Run the Project Locally

### Steps

1. **Clone or Pull the Project**
   - If you're not a contributor yet, clone the repository using:
     ```bash
     git clone <repository-url>
     ```
   - If you're a contributor, pull the latest changes:
     ```bash
     git pull origin main
     ```

2. **Install Dependencies**
   - Open your terminal in the project's base directory and run:
     ```bash
     npm install
     ```

3. **Create the `.env` File**
   - In the base directory, create a `.env` file.
   - Copy and paste the required environment variables:
    ```bash
    PORT=5000
    MONGO_LOCAL = mongodb://localhost:27017/inventory
    MONGO_URL =  // To be implemented in Production

---

## Project Structure

```mermaid
flowchart TB
    root --> index.js[📄index.js]
    root --> package.json[📄package.json]
    root --> package-lock.json[📄package-lock.json]
    root --> .env[📄.env]
    root --> .gitignore[📄.gitignore]
    root --> README.md[📄README.md]
    root --> Products[📁Products]
    Products --> product.routes.js[📄product.routes.js]
    Products --> product.schema.js[📄product.schema.js]
    Products --> requests.rest[📄requests.rest]
    root --> Auth[📁Auth]
    Auth --> models[📁 models]
    models --> user.js[📄 user.js]
    Auth --> routes[📁 routes]
    routes --> auth.js[📄 auth.js]
    routes --> users.js[📄 users.js]
    Auth --> requests.rest[📄requests.rest]
    root --> node_modules[📁 node_modules]
