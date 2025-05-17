# NPM (Node Package Manager)

## What is NPM?
NPM (Node Package Manager) is the default package manager for Node.js and is the world's largest software registry. It consists of:
- A command-line interface (CLI) tool for publishing and downloading packages
- An online repository that hosts JavaScript packages

## Why use NPM?
- Manage project dependencies
- Install software packages
- Share code with other developers
- Control different versions of code
- Update applications easily

## Common NPM Commands

### Project Initialization
```bash
npm init              # Initialize a new project (creates package.json)
npm init -y           # Initialize with default values
```

### Installing Packages
```bash
npm install <package>      # Install a package
npm install -g <package>   # Install package globally
npm install --save-dev     # Install as dev dependency
npm i                      # Short form of install (installs all dependencies)
```

### Managing Dependencies
```bash
npm list                   # List installed packages
npm outdated              # Check for outdated packages
npm update                # Update packages
npm uninstall <package>   # Remove a package
```

### Running Scripts
```bash
npm start                  # Run the start script
npm test                  # Run the test script
npm run <script-name>     # Run custom script defined in package.json
```

### Version Management
```bash
npm version patch         # Increment patch version (1.0.0 -> 1.0.1)
npm version minor         # Increment minor version (1.0.0 -> 1.1.0)
npm version major         # Increment major version (1.0.0 -> 2.0.0)
```

### Publishing
```bash
npm login                 # Login to npm account
npm publish              # Publish package to npm registry
```

### Configuration
```bash
npm config list           # List the npm configuration
npm config set           # Set a config value
npm cache clean          # Clean the npm cache
```

## Important Files

### package.json
- The heart of any Node.js project
- Holds metadata about the project
- Lists dependencies
- Defines scripts

Example structure:
```json
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "Project description",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "package-name": "^1.0.0"
  },
  "devDependencies": {
    "dev-package": "^1.0.0"
  }
}
```

### package-lock.json
- Automatically generated
- Locks dependency versions
- Ensures consistent installs across different environments

## Best Practices
1. Always use a `.gitignore` file to exclude `node_modules`
2. Commit both `package.json` and `package-lock.json`
3. Use specific versions for critical dependencies
4. Use development dependencies appropriately
5. Keep dependencies updated and secure

## Nodemon
Nodemon is a utility that monitors for changes in your source code and automatically restarts your server.

### Installing Nodemon
```bash
npm install nodemon --save-dev    # Install as dev dependency
npm install -g nodemon           # Install globally
```

### Using Nodemon
Instead of running your application with `node app.js`, use:
```bash
nodemon app.js                   # Run application with nodemon
```

### Configuration in package.json
Add nodemon to your npm scripts for easier usage:
```json
{
  "scripts": {
    "start": "nodemon app.js",
    "dev": "nodemon index.js"
  }
}
```

### Common Nodemon Commands
```bash
nodemon --version              # Check nodemon version
nodemon --help                # Display nodemon help
nodemon --ext js,mjs,json    # Watch specific file extensions
nodemon --ignore "*.test.js"  # Ignore specific files
nodemon --delay 2.5          # Add a delay before restarting
```

### Benefits of Nodemon
- Automatic application restart on file changes
- Reduces development time
- Supports various file types
- Customizable through nodemon.json
- Perfect for development environment

## Getting Help
```bash
npm help                  # Get help on npm commands
npm <command> -h         # Quick help on specific command
``` 