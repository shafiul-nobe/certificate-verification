<template>
  <div>
    <div class="flex flex-col items-center justify-center pt-20">
      <div class="flex items-center justify-center text-3xl pb-10">
        Upload Your Final Educational Certificate
      </div>
      <div class="w-full flex flex-col items-center justify-center">
        <form class="w-full" @submit="checkForm">
          <div
            class="border-gray-300 w-full flex flex-col justify-center items-center mb-2"
          >
            <input
              v-model="form.name"
              type="text"
              id="name"
              name="name"
              placeholder=" Enter your full name"
              class="bg-gray-50 border border-gray-500 text-gray-900 w-1/2 mt-2 py-2"
            />
          </div>
          <div
            class="border-gray-300 w-full flex flex-col justify-center items-center mb-2"
          >
            <input
              v-model="form.roll"
              type="text"
              id="roll"
              name="roll"
              placeholder=" Enter your roll number"
              class="bg-gray-50 border border-gray-500 text-gray-900 w-1/2 mt-2 py-2"
            />
          </div>

          <div
            class="border-gray-300 w-full flex flex-col justify-center items-center mb-2"
          >
            <input
              v-model="form.session"
              type="text"
              id="session"
              name="session"
              placeholder=" Enter your session number"
              class="bg-gray-50 border border-gray-500 text-gray-900 w-1/2 mt-2 py-2"
            />
          </div>

          <div
            class="border-gray-300 w-full flex flex-col justify-center items-center mb-2"
          >
          <v-select
              v-model="form.program"
              :options="programOption"
              label="name"
              @input="onProgramSelection"
              class="pt-2 py-2 w-1/2"
            ></v-select>
          </div>

          <div
            class="border-gray-300 w-full flex flex-col justify-center items-center mb-2"
          >
            <v-select
              v-model="form.university_token"
              :options="organizationOptions"
              label="name"
              @input="onOrgSelection"
              class="pt-2 py-2 w-1/2"
            ></v-select>
          </div>

          <div
            class="border-gray-300 w-full flex flex-col justify-center items-center mb-2"
          >
            <input
              type="file"
              id="image"
              name="image"
              title=" "
              class="border-gray-400 bg-gray-200 pt-2 py-2 w-1/2"
              @change="handleUploadImage"
            />
          </div>

          <div
            class="border-gray-300 w-full flex flex-col justify-center items-center mb-2"
          >
            <button
              type="sumbit"
              class="border-gray-300 bg-green-300 w-1/2 p-2 rounded-full py-3 px-6 mt-8"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "../utils/form";
import makeRequest from "../utils/apiRequest";
import getInstituteContract from "../utils/contract";

export default {
  name: "DocumentComponent",
  data() {
    return {
      form: new Form({
        name: null,
        roll: null,
        session: null,
        program: 'Select Study Program',
        university_token: 'Select University',
        certificate_image: null,
      }),
      certificateImage: null,
      selectedOrg: null,
      selectedProgram: null,
      programOption: [{ id: 1, name: 'CSE'}, { id: 2, name: 'EEE'}, { id: 3, name: 'BlockChain'}, { id: 4, name: 'APPLIED MATH'}],
      organizationOptions: [{ id: 1, name: 'MIT'}, { id: 2, name: 'STANFORD'}, { id: 3, name: 'HARVARD'}, { id: 4, name: 'OXFORD'}]
    };
  },
  methods: {
    handleUploadImage(event) {
      const input = event.target.files[0];
      this.form.certificate_image = input;
      if (input && input.size > 2 * 1020 * 1020) {
        let size = input.size / (1020 * 1024);
        window.alert(
          `File size must be less than 2mb. current file size: ${size.toFixed(
            2
          )} mb`
        );
      }
      if (input) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.certificateImage = e.target.result;
        };
        reader.readAsDataURL(input);
      }
    },

    onOrgSelection(data) {
      if( typeof data === 'object' ) {
        this.selectedOrg = data;
      }
      console.log('data', data);
    },

    onProgramSelection(data) {
      if( typeof data === 'object' ) {
        this.selectedProgram = data;
      }
      console.log('data', data);
    },

    async checkForm(event) {
      event.preventDefault();

      const filePostUrl = 'http://localhost:5000/api/v1/file'

      var formData = new FormData();

      let { name, roll, session } = this.form;

      formData.append("certificate", this.form.certificate_image);
      try {
        const result = await makeRequest({
          url: filePostUrl,
          method: "post",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(result);

        let certificate_url = result.data.filePath;

        let instituteContract = await getInstituteContract();
        //let applicationperWallet = await instituteContract.applicationperWallet();

        if (this.selectedOrg === null ) {
          window.alert('Please select Your Organization');
          return;
        }

        if (this.selectedProgram === null ) {
          window.alert('Please select study program');
          return;
        }

        let transactionInformation = await instituteContract.applyForCertificate(
          name,
          roll,
          session,
          this.selectedProgram.id,
          this.selectedOrg.id,
          certificate_url
        );

        console.log(transactionInformation)
      } catch (error) {
        console.log("error");
        throw error;
      }






      //console.log(Number(applicationperWallet));

      // const formData = new FormData();

      // formData.append("name", this.form.name);
      // formData.append("roll", this.form.roll);
      // formData.append("session", this.form.session);
      // formData.append("university_token", this.form.university_token);
      // formData.append("certificate_image", this.form.certificate_image);
      // try {
      //   const result = await makeRequest({
      //     url: process.env.VUE_APP_HERMES_API_BASE_URL,
      //     method: "post",
      //     data: formData,
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });
      //   console.log(result);
      // } catch (error) {
      //   console.log("error");
      //   throw error;
      // }
    },

    // Example POST method implementation:
    async checkFormx(event) {
      event.preventDefault();

      var formData = new FormData();

      formData.append("name", this.form.name);
      formData.append("roll", this.form.roll);
      formData.append("session", this.form.session);
      formData.append("university_token", this.form.university_token);
      formData.append("certificate_image", this.form.certificate_image);

      const response = await fetch(process.env.VUE_APP_HERMES_API_BASE_URL, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': "multipart/form-data"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: formData // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    },



    // checkForm(event) {
    //   event.preventDefault();

    //   const formData = new FormData();

    //   formData.append("name", this.form.name);
    //   formData.append("roll", this.form.roll);
    //   formData.append("session", this.form.session);
    //   formData.append("university_token", this.form.university_token);
    //   formData.append("certificate_image", this.form.certificate_image);

    //   fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     body: formData,
    //     headers: {
    //       'Content-type': 'application/x-www-form-urlencoded',
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));

    // }
  },
};
</script>

<style scoped>
.image-container img {
  width: 100%;
  height: 100%;
}

.image-container .upload-btn {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
