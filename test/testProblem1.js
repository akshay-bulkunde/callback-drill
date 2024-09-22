const {createDirectory , createFiles , deleteFiles} = require('../problem1.js');

let numberOfFiles = 3;

// createDirectory('callbackFolder' , numberOfFiles, function(dirPath , numberOfFiles){
//     createFiles(dirPath, numberOfFiles , function(dirPath){
//         deleteFiles(dirPath);
//     })
// });

createDirectory('callbackFolder', numberOfFiles, function(dirPath, numFiles) {
    createFiles(dirPath, numFiles, function(dirPath) {
        console.log("All files created. Now deleting...");
        deleteFiles(dirPath);
    });
});
