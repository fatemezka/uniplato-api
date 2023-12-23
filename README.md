
# Uniplato Task Project

The project is a Node.js backend application using the Fastify framework, Prisma as the MySQL ORM, Mocha and Chai for testing, and AJV for validation. It manages two tables: User and Category. User handles user data, while Category is a table for project categories. 
The project has the following endpoints:



## User Endpoints

#### Register API

```http
  POST /user/register
```
Register a new user.

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. |
| `family` | `string` | **Required**. |
| `username` | `string` | **Required**. |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Get item

```http
  POST /user/login
```
Authenticate and returns user's access_token.

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |

## Category Endpoints

#### Get all categories

```http
  GET /category/all
```
Get a list of all categories.

#### Get category by ID

```http
  GET /category/:id
```
Get details of a specific category by it's own ID.

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. |

```http
  PUT /category/:id
```
Update category's score by given ID and score (or update score base on operation type).

| Params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. |

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `score` | `integer` | **Optional**. |
| `operation` | `string enum["increase","decrease"]` | **Optional**. |


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Database Setup

```bash
  npx prisma migrate dev
```

Start the server

```bash
  npm run dev
```
```bash
  npm run start
```
- As you can see some scripts declared in package.json file.


## Authentication
In this project we used @fastify/jwt to create jwt (jsonwebtoken) token to authenticate user info in each requests that it needs.
In login response we return access token and frontend put it in header of each next request.
## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Environment Variables

To run this project, you will need to create new `.env` file in the root of the project directory and put `.env.template` variables there, and give them correct values.


