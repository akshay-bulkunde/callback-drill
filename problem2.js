// Problem 2:

//     Using callbacks and the fs module's asynchronous functions, do the following:
//         1. Read the given file lipsum.txt
//         2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
//         3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
//         4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
//         5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.


const fs = require('fs');
const path = require('path');
const filePath = './lipsum.txt';
function readFiles(){
    fs.readFile(filePath , 'utf-8' , (err , data) => {
        if(err){
            console.error("error : ")
            console.error(err);
        }else{
            console.log("success : ");
            console.log(data);
            const upperCaseData = data.toUpperCase();
            const newFileName1 = 'file1.txt';
            const newFilePath1 =  path.join(__dirname , newFileName1);
            fs.writeFile(newFilePath1 , upperCaseData , (err) => {
                if(err){
                    console.error("error : ");
                    console.error(err);
                }else{
                    console.log(`upperCaseData is added in ${newFileName1}`);
                    fs.appendFile('filenames.txt' , newFileName1 + '\n' , (err) => {
                        if(err){
                            console.error("error : ");
                            console.error(err);
                        }else{
                            console.log(`${newFileName1} is appended in filename.txt successfully`);
                            readAndSplit(newFilePath1);

                        }
                    });
                }
            });
        }
    });

    


}

function readAndSplit(newFilePath){
    fs.readFile(newFilePath , 'utf-8' , (err , data) => {
        if(err){
            console.error("error :");
            console.error(err);
        }else{
            console.log("file read successfully");
            console.log(data);
            const lowerCaseData = data.toLowerCase().split('. ').join('\n');
            console.log(lowerCaseData)
            const newFileName2 = 'file2.txt';
            const newFilePath2 = path.join(__dirname , newFileName2);
            fs.writeFile(newFilePath2 , lowerCaseData , (err) => {
                if(err){
                    console.error("error : ");
                    console.log(err);
                }else{
                    console.log(`lowercase data is added in ${newFileName2}`);
                    fs.appendFile('filenames.txt' , newFileName2 + '\n', (err) => {
                        if(err){
                            console.error("error : ");
                            console.log(err);
                        }else{
                            console.log(`${newFileName2} is added in filenames.txt`)
                            sortData(newFilePath2)
                        }
                    })
                }
            })

        }
    })
}

function sortData(newFilePath2){
    fs.readFile(newFilePath2 , 'utf-8' , (err , data) => {
        if(err){
            console.error("error : ");
            console.log(err);
        }else{
            console.log("file read successfully : ");
            console.log(data);
            const sortedData = data.split('. ').sort();
            const newFileName3 = 'file3.txt';
            const newFilePath3 = path.join(__dirname , newFileName3);
            fs.writeFile(newFilePath3  , sortedData.join('. ') , (err) => {
                if(err){
                    console.error("error : ");
                    console.error(err);
                }else{
                    console.log(`sortedData added in ${newFileName3}`);
                    console.log(sortData);
                    fs.appendFile('filenames.txt' , newFileName3 + '\n' , (err) => {
                        if(err){
                            console.error("error : ");
                            console.log(err);
                        }else{
                            console.log(`${newFileName3} is added in filenames.txt successfully`);
                            deleteFiles();
                        }
                    })
                }
            })
        }
    })
}

function deleteFiles(){
    fs.readFile('filenames.txt' , 'utf-8' , (err , filenames) => {
        if(err){
            console.error("error : ");
            console.error(err);
        }else{
            console.log("file read successfully");
            const files = filenames.trim().split('\n');
            files.forEach((file) => {
                fs.unlink(file , (err) => {
                    if(err){
                        console.error("error :");
                        console.error(err);
                    }else{
                        console.log(`${file} successfully deleted`)
                    }
                })
            })
        }

    }) 
}

module.exports = {readFiles};



