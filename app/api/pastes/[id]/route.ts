// import { NextResponse } from "next/server";

// // SHARED GLOBAL STORE (same as above)
// declare global {
//   var pastes: Record<string, any>;
// }

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const id = params.id;
  
//   console.log("Looking for paste:", id, "Available:", Object.keys((globalThis as any).pastes || {}));
  
//   const paste = (globalThis as any).pastes?.[id];
  
//   if (!paste) {
//     console.log("Paste not found:", id);
//     return NextResponse.json({ error: "Paste not found" }, { status: 404 });
//   }
  
//   console.log("Found paste:", id);
  
//   return NextResponse.json({
//     content: paste.content,
//     remaining_views: paste.remaining_views,
//     expires_at: paste.expires_at
//   });
// }






// import { NextResponse } from "next/server";
// import fs from 'fs/promises';
// import path from 'path';

// const DATA_FILE = path.join(process.cwd(), 'pastes.json');

// async function loadPastes() {
//   try {
//     const data = await fs.readFile(DATA_FILE, 'utf8');
//     return JSON.parse(data);
//   } catch {
//     return {};
//   }
// }

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const id = params.id;
//     const pastes = await loadPastes();
    
//     console.log("🔍 GET Looking for:", id);
    
//     const paste = pastes[id];
    
//     if (!paste) {
//       console.log("❌ NOT found:", id);
//       return NextResponse.json({ error: "Paste not found" }, { status: 404 });
//     }
    
//     console.log("✅ GET Found:", id);
    
//     return NextResponse.json({
//       content: paste.content,
//       remaining_views: paste.remaining_views,
//       expires_at: paste.expires_at
//     });
//   } catch (err) {
//     console.error("GET Error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }






// import { NextResponse } from "next/server";
// import fs from 'fs/promises';
// import path from 'path';

// const DATA_FILE = path.join(process.cwd(), 'data', 'pastes.json');

// async function loadPastes() {
//   try {
//     const data = await fs.readFile(DATA_FILE, 'utf8');
//     const pastes = JSON.parse(data);
//     console.log("📂 LOADED pastes.json:", Object.keys(pastes).length, "pastes");
//     return pastes;
//   } catch {
//     console.log("📂 No pastes.json found");
//     return {};
//   }
// }

// export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     // ✅ AWAIT params (Next.js 15+ requirement)
//     const { id } = await params;
    
//     const pastes = await loadPastes();
    
//     console.log("🔍 GET Looking for ID:", id);
//     console.log("📋 Available IDs:", Object.keys(pastes));
    
//     const paste = pastes[id];
    
//     if (!paste) {
//       console.log("❌ NOT found:", id);
//       return NextResponse.json({ error: "Paste not found" }, { status: 404 });
//     }
    
//     console.log("✅ GET Found:", id);
    
//     return NextResponse.json({
//       content: paste.content,
//       remaining_views: paste.remaining_views,
//       expires_at: paste.expires_at
//     });
//   } catch (err) {
//     console.error("GET Error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }





// import { NextResponse } from "next/server";
// import { loadPastes } from "@/lib/pastes";

// export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const { id } = await params;
//     const pastes = await loadPastes();
    
//     console.log("🔍 Looking for:", id, "Found:", Object.keys(pastes));
    
//     const paste = pastes[id];
    
//     if (!paste) {
//       return NextResponse.json({ error: "Paste not found" }, { status: 404 });
//     }
    
//     return NextResponse.json({
//       content: paste.content,
//       remaining_views: paste.remaining_views,
//       expires_at: paste.expires_at
//     });
//   } catch (err) {
//     console.error("GET Error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }





// import { NextResponse } from "next/server";
// import { loadPastes, savePaste } from "@/lib/pastes"; // Add savePaste import

// export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const { id } = await params;
//     const pastes = await loadPastes();
//     const paste = pastes[id];
    
//     if (!paste) {
//       return NextResponse.json({ error: "Paste not found" }, { status: 404 });
//     }

//     // CHECK EXPIRY
//     const nowMs = Date.now();
//     if (paste.expires_at && nowMs >= paste.expires_at) {
//       delete pastes[id]; // Clean up expired
//       await savePaste(id, paste); // Save updated
//       return NextResponse.json({ error: "Paste expired" }, { status: 404 });
//     }

//     // CHECK/DECREMENT VIEWS
//     if (paste.remaining_views !== null && paste.remaining_views <= 0) {
//       delete pastes[id];
//       await savePaste(id, paste);
//       return NextResponse.json({ error: "Max views exceeded" }, { status: 404 });
//     }

//     // DECREMENT VIEWS
//     if (paste.remaining_views !== null) {
//       paste.remaining_views -= 1;
//       await savePaste(id, paste); // Save updated views
//     }

//     return NextResponse.json({
//       content: paste.content,
//       remaining_views: paste.remaining_views,
//       expires_at: paste.expires_at
//     });
//   } catch (err) {
//     console.error("GET Error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import { loadPastes, savePaste } from "@/lib/pastes";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const pastes = await loadPastes();
    const paste = pastes[id];
    
    if (!paste) {
      return NextResponse.json({ error: "Paste not found" }, { status: 404 });
    }

    // ✅ TEST_MODE: Deterministic time for automated tests
    let nowMs = Date.now();
    if (process.env.TEST_MODE === '1') {
      const testTime = req.headers.get('x-test-now-ms');
      if (testTime) {
        nowMs = Number(testTime);
        console.log("🧪 TEST_MODE nowMs:", nowMs);
      }
    }

    // ✅ CHECK EXPIRY (TTL)
    if (paste.expires_at && nowMs >= paste.expires_at) {
      console.log("⏰ Paste expired:", id);
      delete pastes[id];
      await savePaste(id, paste);
      return NextResponse.json({ error: "Paste expired" }, { status: 404 });
    }

    // ✅ CHECK MAX VIEWS
    if (paste.remaining_views !== null && paste.remaining_views <= 0) {
      console.log("👁️ Max views exceeded:", id);
      delete pastes[id];
      await savePaste(id, paste);
      return NextResponse.json({ error: "Max views exceeded" }, { status: 404 });
    }

    // ✅ DECREMENT VIEWS
    if (paste.remaining_views !== null) {
      paste.remaining_views -= 1;
      console.log("👁️ Views decremented:", id, "Remaining:", paste.remaining_views);
      await savePaste(id, paste);
    }

    console.log("✅ GET success:", id);

    return NextResponse.json({
      content: paste.content,
      remaining_views: paste.remaining_views,
      expires_at: paste.expires_at
    });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
