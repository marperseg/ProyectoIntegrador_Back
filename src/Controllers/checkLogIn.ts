"use strict";
import { User } from "../Models/models.js";
import { userLoggedIn, UserLogIn, UserCreated } from "../Models/types";
import session, { Session, SessionData } from "express-session";

// This function verifies that a valid user is logged in before proceeding with the requests
async function checkLogIn(
  session1: Partial<SessionData>
): Promise<userLoggedIn> {

    let LoggedIn: userLoggedIn = {
        // Default values
        name: "No user",
        id: "No user",
        checked: false,
        logged: false,
      };
    
      if (session1.user) {
        console.log("...User ", session1.user, " is logged in...");
        LoggedIn = session1.user;
      } else {
        console.log("... No one is logged in...");
      }

  return LoggedIn;
}

// This function validates the user's session token before proceeding with the requests *UNDER CONSTRUCTION*
async function checkSessionToken(): Promise<boolean> {
  return true;
}


export {checkLogIn}