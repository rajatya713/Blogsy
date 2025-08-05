import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async signup({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //if account is created then log in
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Error occurred while signup:: ", error);
      throw error
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Error occured while logging out:: ", error);
    }
  }
  async getCurrentUser() {
    try {
      const currentUser = await this.account.get();
      return currentUser;
    } catch (error) {
      console.log("Error occured while getting user:: ", error);
    }
    return null; // return null if currentUser is not found
  }
}
const authService = new AuthService();
export default authService;
