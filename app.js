const { Client, Account, Databases, ID } = Appwrite;

// Initialize Appwrite
const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Your endpoint
  .setProject("690268ce0011157bec02"); // Your project ID


const account = new Account(client);
const databases = new Databases(client);

const databaseId = "appdata";
const collectionId = "appwrte-data";

// ===============================
// UI Helpers
// ===============================

function showDashboard() {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

function showAuth() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("auth-section").style.display = "block";
}

// ===============================
// Check Session On Page Load
// ===============================

async function checkSession() {
  try {
    await account.get(); // If session exists, this succeeds
    showDashboard();
  } catch (error) {
    showAuth();
  }
}

checkSession();

// ===============================
// Register
// ===============================

async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await account.create(ID.unique(), email, password);
    alert("Registered successfully! Please login.");
  } catch (error) {
    alert(error.message);
  }
}

// ===============================
// Login (FIXED)
// ===============================

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Check if already logged in
    await account.get();
    alert("You are already logged in.");
    showDashboard();
    return;
  } catch (e) {
    // No active session — continue login
  }

  try {
    await account.createEmailSession(email, password);
    showDashboard();
  } catch (error) {
    alert(error.message);
  }
}

// ===============================
// Logout
// ===============================

async function logout() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.log("No active session");
  }

  showAuth();
}

// ===============================
// Fetch Data
// ===============================

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
