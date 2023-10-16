const { test, expect } = require('@playwright/test');

test.describe('DSR', () => {
      test.beforeEach(async ({ page }) => {
        // Access to the page is valid if you are on it
          await page.goto('https://vladimirwork.github.io/web-ui-playground/');
          await expect(page).toHaveTitle('Web UI Playground');
       });

       // Correct test data
          const FirstName   = "Joao";
          const LastName    = "Dasmaceno";
          const Email       = "joao@gmail.com";
          const PhoneNumber = "910555777";
          const Gender      = "Female";
          const Vacancy     = "Business Analyst";
          const YourCV      = "docs/example.txt";
          const Agreement   = 'true';       

      test('Correct registration', async ({ page }) => {
          // Fill in the form
          await page.fill('//input[@name="FirstName"]',FirstName)        // First Name
          await page.fill('//input[@name="LastName"]',LastName)          // Last Name
          await page.fill('//input[@name="Email"]',Email)                // Email
          await page.fill('//input[@name="PhoneNumber"]',PhoneNumber)    // Phone Number
          await page.locator(`//input[@value=\"${Gender}\"]`).click();   // Gender
          await page.selectOption('//select[@name="Vacancy"]',Vacancy);  // Vacancy
          await page.locator('#myfile').setInputFiles(`${YourCV}`);      // Your CV:

          if (Agreement) {
            await page.locator('//input[@name="Agreement"]').click();      // I agree to the processing of personal dataawait gallery.click();
          } 
          
          page.on('dialog',async (dialog) => {
            expect(dialog.message()).toContain(`{"FirstName":\"${FirstName}\","LastName":\"${LastName}\","Email":\"${Email}\","PhoneNumber":\"${PhoneNumber}\","Gender":\"${Gender}\","Vacancy":\"${Vacancy}\","CV":{},"Agreement":${Agreement}}`)
            await dialog.dismiss()  
          });
          await page.locator('//input[@name="submitbutton"]').click(); // Click the OK button 
          
        // Confirms that no warning has been displayed
          const locator_FirstName   = page.locator('//p[text()="Valid first name is required."]');
          const locator_LastName    = page.locator('//p[text()="Valid last name is required."]');
          const locator_Email       = page.locator('//p[text()="Valid email is required."]');
          const locator_PhoneNumber = page.locator('//p[text()="Valid phone number is required."]');
          const locator_Gender      = page.locator('//p[text()="Choose your gender."]');
          const locator_YourCV      = page.locator('//p[text()="Attach your CV file.."]');
          const locator_Agreement   = page.locator('//p[text()="You must agree to the processing of personal data."]');
          
          await expect(locator_FirstName).toBeHidden();
          await expect(locator_LastName).toBeHidden();
          await expect(locator_Email).toBeHidden();
          await expect(locator_PhoneNumber).toBeHidden();          
          await expect(locator_Gender).toBeHidden();
          await expect(locator_YourCV).toBeHidden();
          await expect(locator_Agreement).toBeHidden();
       });


        const invalid_information = [
          {
            description: 'Fisrt Name empty',
            FirstName: '',
            LastName: LastName,
            Email: Email,
            PhoneNumber: PhoneNumber,
            HasGender: 'true',
            Gender: Gender ,  
            Vacancy: Vacancy,
            HasCV: 'true',
            YourCV:YourCV,
            Agreement: 'true',
            locator_warning: '//p[text()="Valid first name is required."]'
          },
          {
            description: 'Last Name empty',
            FirstName: FirstName,
            LastName: '',
            Email: Email,
            PhoneNumber: PhoneNumber,
            HasGender: 'true',            
            Gender: Gender ,  
            Vacancy: Vacancy,
            HasCV: 'true',            
            YourCV:YourCV,
            Agreement: 'true',
            locator_warning: '//p[text()="Valid last name is required."]'
          },
          {
            description: 'Email empty',
            FirstName: FirstName,
            LastName: LastName,
            Email: '',
            PhoneNumber: PhoneNumber,
            HasGender: 'true',            
            Gender: Gender ,  
            Vacancy: Vacancy,
            HasCV: 'true',            
            YourCV:YourCV,
            Agreement: 'true',
            locator_warning: '//p[text()="Valid email is required."]'
          },             
          {
            description: 'Incorrect email format (without "AT SIGN")',
            FirstName: FirstName,
            LastName: LastName,
            Email: 'joaogmail.com',
            PhoneNumber: PhoneNumber,
            HasGender: 'true',            
            Gender: Gender ,  
            Vacancy: Vacancy,
            HasCV: 'true',            
            YourCV:YourCV,
            Agreement: 'true',
            locator_warning: '//p[text()="Valid email is required."]'
          },
          {
            description: 'Incorrect email format (without Dot)',
            FirstName: FirstName,
            LastName: LastName,
            Email: 'joao@gmailcom',
            PhoneNumber: PhoneNumber,
            HasGender: 'true',            
            Gender: Gender ,  
            Vacancy: Vacancy,
            HasCV: 'true',            
            YourCV:YourCV,
            Agreement: 'true',
            locator_warning: '//p[text()="Valid email is required."]'
          },
          {
            description: 'Empty phone number',
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            PhoneNumber: '',
            HasGender: 'true',            
            Gender: Gender ,  
            Vacancy: Vacancy,
            HasCV: 'true',            
            YourCV:YourCV,
            Agreement: 'true',
            locator_warning: '//p[text()="Valid phone number is required."]'
          },
          {
            description: 'Phone number with letters',
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            PhoneNumber: '9997778p',
            HasGender: 'true',            
            Gender: Gender ,  
            Vacancy: Vacancy,
            HasCV: 'true',            
            YourCV:YourCV,
            Agreement: 'true',
            locator_warning: '//p[text()="Valid phone number is required."]'
          },
          {
            description: 'Phone number with less than 7 digits',
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            PhoneNumber: '999777',
            HasGender: 'true',            
            Gender: Gender ,  
            Vacancy: Vacancy,
            HasCV: 'true',            
            YourCV:YourCV,
            Agreement: 'true',
            locator_warning: '//p[text()="Valid phone number is required."]'
          },                             
          {
            description: 'Gender not chosen',
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            PhoneNumber: PhoneNumber,
            HasGender: 'false',            
            Gender: '',  
            Vacancy: Vacancy,
            HasCV: 'true',            
            YourCV:YourCV,
            Agreement: 'true',
            locator_warning: '//p[text()="Choose your gender."]'
          },
          {
            description: 'Without uploading the file',
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            PhoneNumber: PhoneNumber,
            HasGender: 'true',            
            Gender: Gender,  
            Vacancy: Vacancy,
            HasCV: 'false',            
            YourCV: YourCV,
            Agreement: 'true',
            locator_warning: '//p[text()="Attach your CV file."]'
          },                           
          {
            description: 'Disagree with the processing of personal data.',
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            PhoneNumber: PhoneNumber,
            HasGender: 'true',            
            Gender: Gender,  
            Vacancy: Vacancy,
            HasCV: 'true',            
            YourCV: YourCV,
            Agreement: 'false',
            locator_warning: '//p[text()="You must agree to the processing of personal data."]'
          },              
        ];

        for (const scenario of invalid_information) {

          test(`Validate field rule: ${scenario.description} `, async ({ page }) => {

            // await page.goto('https://vladimirwork.github.io/web-ui-playground/');
            // await page.reload()

            // Fill in the form
            await page.fill('//input[@name="FirstName"]',`${scenario.FirstName}`)       // First Name
            await page.fill('//input[@name="LastName"]',`${scenario.LastName}`)         // Last Name
            await page.fill('//input[@name="Email"]',`${scenario.Email}`)               // Email
            await page.fill('//input[@name="PhoneNumber"]',`${scenario.PhoneNumber}`)   // Phone Number
            await page.selectOption('//select[@name="Vacancy"]',`${scenario.Vacancy}`); // Vacancy
                        
            if (`${scenario.HasGender}` == 'true') { 
                await page.locator(`//input[@value=\"${scenario.Gender}\"]`).click(); 
            }  // Gender
            if (`${scenario.HasCV}` == 'true')     { await page.locator('#myfile').setInputFiles(`${scenario.YourCV}`); }     // Your CV:
            if (`${scenario.Agreement}` == 'true') { await page.locator('//input[@name="Agreement"]').click(); }  // I agree to the processing of personal data;
            
            await page.locator('//input[@name="submitbutton"]').click(); // Click the OK button 
            
          // Confirms that no warning has been displayed
            const warning   = page.locator(`${scenario.locator_warning}`);
            await expect(warning).toBeVisible();
        });

      };




});



// 
//   test(`Validate field rule: ${scenario.description} `, async ({ page }) => {

//     await page.goto('https://vladimirwork.github.io/web-ui-playground/');
//     await expect(page).toHaveTitle('Web UI Playground');

//     // Fill in the form
//     await page.fill("//input[@name='FirstName']",FirstName)          // First Name
//     await page.fill('//input[@name="LastName"]',LastName)            // Last Name
//     await page.fill('//input[@name="Email"]',Email)                  // Email
//     await page.fill('//input[@name="PhoneNumber"]',PhoneNumber)      // Phone Number
//     await page.locator('//input[@value="Female"]').click();          // Gender
//     await page.selectOption('//select[@name="Vacancy"]',Vacancy);    // Vacancy
//     await page.locator('#myfile').setInputFiles('docs/example.txt'); // Your CV:
//     await page.locator('//input[@name="Agreement"]').click();        // I agree to the processing of personal data

//     await page.locator('//input[@name="submitbutton"]').click(); // Click the OK button 





//     await page.goto('/login');
//     await page.getByLabel('Username').fill(scenario.username);
//     await page.getByLabel('Password').fill(scenario.password);
//     await page.getByRole('button', { name: 'Login' }).click();
//     await expect(page.locator('id=flash')).toContainText(scenario.errorMessage);
//   });
// }

