# LMS FRONTEND

### Setup Instructions

1. Clone the project

```
    git clone https://github.com/Jonahs17/LMS-Frontend.git
```

2. Move to the directory

```
    cd client
```

3. Install dependencies

```
    npm install
```

4. Run the server

```
    npm run dev
```

### Tailwind Setup

1. Install tailwind and its dependencies
```
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
```

2. Update tailwind config file
```
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ]
```

3. Update index.css file
```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

4. Run your build process
```
    npm run dev
```



