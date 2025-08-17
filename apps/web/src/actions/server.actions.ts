"use server"

import connDb from "@/lib/connDb"
import { NextResponse } from "next/server"

export async function checkServerhealth() {
    await connDb()
    return {message: "OK"}
}