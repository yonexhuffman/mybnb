// https://freeprog.tistory.com/251     progress function
const IncomingForm = require('formidable').IncomingForm;
var util = require('util');
var fs = require('fs-extra');

module.exports = function upload(req, res) {
    // Single File Upload
    var form = new IncomingForm()
    form.maxFileSize = 1024 * 1024; //default maxFileSize is 1000MB
    form.uploadDir = './uploads/'

    form.parse(req)
    form.on('fileBegin', function (name, file) {
        file.path = form.uploadDir + file.name;
    })

    form.on('file', (field, file) => {
        res.send('Uploaded/' + file.name)
    })
    form.on('end', () => {
        res.json()
    })

    // Multiple Files Upload    
    // var form = new IncomingForm()
    // form.uploadDir = './uploads/'
    // form.maxFileSize = 1000;    //default maxFileSize is 200MB
    // console.log(form.multiples);
    // form.multiples = true;
    // form.parse(req, function (err, fields, files) {
    //     res.writeHead(200, { 'content-type': 'text/plain' });
    //     res.write('received upload:\n\n');
    //     res.end(util.inspect({ fields: fields, files: files }));
    // });

    // form.on('fileBegin', function (name, files) {
    //     for (var i = 0; i < file.length; i++) {
    //         files[i].path = form.uploadDir + files[i].name;
    //     }
    // })
    // form.on('end', function (fields, files) {
    //     console.log(this.openedFiles);
    //     for (var i = 0; i < this.openedFiles.length; i++) {
    //         /* Temporary location of our uploaded file */
    //         var temp_path = this.openedFiles[i].path;
    //         /* The file name of the uploaded file */
    //         var file_name = this.openedFiles[i].name;
    //         /* Location where we want to copy the uploaded file */
    //         var new_location = './uploads/';
    //         console.log("temp_path == ", temp_path);
    //         console.log("file_name == ", file_name);
    //         console.log(this.openedFiles[i]);
    //         fs.move(temp_path, new_location + file_name, function (err) {
    //             if (err) {
    //                 console.error(err);
    //             }
    //             else {
    //                 console.log("success!")
    //             }
    //         });
    //     }
    // });
}