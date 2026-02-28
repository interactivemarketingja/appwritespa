const { Client, Account, Databases, ID } = Appwrite;

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Your endpoint
  .setProject("690268ce0011157bec02"); // Your project ID

const account = new Account(client);
const databases = new Databases(client);

const databaseId = "appdata";
const collectionId = "appwrte-data";

async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await account.create(ID.unique(), email, password);
    alert("Registered successfully!");
  } catch (error) {
    alert(error.message);
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await account.createEmailSession(email, password);
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
  } catch (error) {
    alert(error.message);
  }
}

async function logout() {
  await account.deleteSession("current");
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("auth-section").style.display = "block";
}

async function getData() {
  try {
    const response = await databases.listDocuments(
      databaseId,
      collectionId
    );
    document.getElementById("output").textContent =
      JSON.stringify(response.documents, null, 2);
  } catch (error) {
    alert(error.message);
  }
}
