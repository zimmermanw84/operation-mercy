module.exports = (grunt) => {
   grunt.initConfig({
      browserify: {
         dist: {
            options: {
               transform: [
                  ["babelify", {
                     loose: "all"
                  }]
               ]
            },
            files: {
               // if the source file has an extension of es6 then
               // we change the name of the source file accordingly.
               // The result file's extension is always .js
               "./public/js/dist/build.js": ["./public/js/src/index.js"]
            }
         }
      },
      watch: {
         scripts: {
            files: ["./public/js/src/**/*.js"],
            tasks: ["browserify"]
         }
      }
   });

   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-watch");

   grunt.registerTask("default", ["watch"]);
   grunt.registerTask("build", ["browserify"]);
};