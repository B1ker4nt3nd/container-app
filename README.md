# This app is a container for a library which will be published to npmjs.com

## Was made based on:

[How to publish npm library](https://jasonwatmore.com/post/2020/06/16/angular-npm-how-to-publish-an-angular-component-to-npm)

Commands:

- `ng new container-app`
- `ng generate library ngx-file-uploader`
- Package linking is a two-step process.

> 1.  First, `npm link` in a package folder will create a symlink in the global folder {prefix}/lib/node_modules/<package> that links to the package where the `npm link` command was executed. It will also link any bins in the package to {prefix}/bin/{name}. Note that `npm link` uses the global prefix (see npm prefix -g for its value).
> 2.  Next, in some other location, `npm link package-name` will create a symbolic link from globally-installed package-name to node_modules/ of the current folder.

- in package: `npm link`
- in project: `npm link ngx-file-uploader`
- in package: `ng build ngx-file-uploader --prod`
- in package: `npm publish`
