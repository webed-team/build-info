![](https://static.4da.ms/build_info.png)

<p align="center">
    <a><img src="https://github.com/inexio/angular-build-info/workflows/build/badge.svg"></a>
</p>
<p align="center">
    <a><img src="https://img.shields.io/npm/v/angular-build-info"></a>
    <a><img src="https://img.shields.io/badge/node-v8%2B-brightgreen"></a>
    <a><img src="https://img.shields.io/npm/dt/angular-build-info"></a>
    <a><img src="https://img.shields.io/github/issues/4dams/davinci"></a>
    <a><img src="https://img.shields.io/github/issues-pr/4dams/davinci"></a>
</p>

## Description

**`angular-build-info`** is a command line interface to collect information about your current build. It compiles information such as the timestamp when the application was built, the current git user, the hash of the latest commit and the current version from inside your projects `package.json` file.

Example output of the CLI looks as follows:

```typescript
// Angular build information, automatically generated by `4dams/angular-build-info`

export const buildInfo = {
    user: "Juri Adams",
    hash: "1e872b5",
    version: "1.1.4",
    timestamp: "November 15, 2019 16:37:35",
};
```

## Installation and Usage

Installation is pretty easy:

```sh
npm i -g angular-build-info
```

Running the script with the `--init` flag (`angular-build-info --init`) then produces a `build.ts` file inside your Angular projects `src/` folder. You can then proceed to import this file inside your Angular application. An example making use of this information can be found below.

Another important thing to use this tool effectively is to update your `package.json` scripts. Below is an example of what your `build` or `deploy` script might look like.

```json
{
    "scripts": {
        "build": "angular-build-info && ng build",
        "deploy": "angular-build-info && ng build --prod && ./deploy"
    }
}
```

If you now run any of these commands, information about the current build will be saved inside the previously mentioned `build.ts` file.

## Implementing in Angular

Below is an example of what your `app.component.ts` might look like after implementing the information from inside the `build.ts` file.

```typescript
import { Component } from "@angular/core";
import { buildInfo } from "../build";
import { environment } from "../environments/environment";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    constructor() {
        console.log(
            `\n%cBuild Info:\n\n` +
                `%c ❯ Environment: %c${environment.production ? "production 🏭" : "development 🚧"}\n` +
                `%c ❯ Build Version: ${buildInfo.version}\n` +
                ` ❯ Build Timestamp: ${buildInfo.timestamp}\n` +
                ` ❯ Build Message: %c${buildInfo.message || "<no message>"}\n`,
            "font-size: 14px; color: #7c7c7b;",
            "font-size: 12px; color: #7c7c7b",
            environment.production ? "font-size: 12px; color: #95c230;" : "font-size: 12px; color: #e26565;",
            "font-size: 12px; color: #7c7c7b",
            "font-size: 12px; color: #bdc6cf",
        );
    }
}
```

This is what the previous code will output in the browser console once you open the app:

![](https://static.4da.ms/build_info_example.png)

## Authors

-   **Juri Adams** - _Initial Work_ - [@4dams](https://github.com/4dams)

## License

This project is underlying the MIT-License. For more information, take a look at this projects LICEMSE.md file.
