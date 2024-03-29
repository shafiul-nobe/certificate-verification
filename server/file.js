var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('file', fs.createReadStream('./HL8j1y.jpg'));
data.append('pinataMetadata', '{"name": "MyFile"}');

async function main() {
    var config = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3MmUwZGJlMC0zZjU0LTQyYjItYmFkYS05NTkyYTE5NTIxOTgiLCJlbWFpbCI6ImFhbnVhcmNhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5OTM2ODRhYjMwY2ZjZjY2ZTk0MiIsInNjb3BlZEtleVNlY3JldCI6IjRmY2JjZGZjYmZiMmY1OGQwM2Y1N2QxNjY0MTRmOTM3OTNiNDE3OWViOTJlZDEyOGM3MDk0NTJjYjg4ZTdmZmEiLCJpYXQiOjE2NjY5NDA0MTJ9.LiGIqStYIvsYKoKkxsLr1_5zf4H27IOXg6FPVugFFsw', 
          ...data.getHeaders()
        },
        data : data
    };
      
    const res = await axios(config);
      
    console.log(res.data);
}

main()
