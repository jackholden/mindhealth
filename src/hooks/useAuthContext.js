/**
 * @file Reduces code repetition, a single file as gateway
 * @author Jack Holden
 */

import { useContext } from "react";
import { AuthContext } from "../utils/context/Auth";

/**
 * For DRY purposes, a simple hook to access
 * the Auth Context
 *
 * @returns
 */
export const useAuthContext = () => useContext(AuthContext);
