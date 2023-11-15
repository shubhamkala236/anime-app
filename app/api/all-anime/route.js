//get all anime list

import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    return NextResponse.json({
        Success:true,
        Message:'Anime list'
    })
};
