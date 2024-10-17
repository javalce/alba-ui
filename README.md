# ALBA

This repository contains the code for the user interface of the ALBA project.

## Requirements

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)

## Installation

1. Clone the repository
2. Run `pnpm install` to install the dependencies
3. Run `pnpm dev` to start the development server
4. Open `http://localhost:3000` in your browser

## Environment variables

The project uses the following environment variables:

- `NEXT_PUBLIC_API_URL`: The URL of the API
- `AUTH_SECRET`: The secret used to sign the JWT tokens. Use `npx auth secret` to generate a new secret.
- `APP_BASE_PATH`: The base path of the application. This is useful when the application is not hosted in the root of the domain. E.g. `/alba` if the application is hosted in `https://example.com/alba`.

To set the environment variables, create a `.env.development.local` file in the root of the project and add the variables there for the development environment. For the production environment, create a `.env.production.local` file.

> [!NOTE]
> When using `npx auth secret`, the secret is stored in the `.env.local` file.

## Deployment

To deploy the project, it is provided a `Dockerfile` that builds the project by using `docker-compose`:

```bash
docker-compose up -d --build
```

## Makefile

The project provides a `Makefile` which simplifies the deployment process. The following commands are available:

- `make up`: Builds the project and starts the containers
- `make down`: Stops the containers
- `make build`: Builds the project
- `make shell`: Opens a shell in the container

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
