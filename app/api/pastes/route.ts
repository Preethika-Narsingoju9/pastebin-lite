// import { NextResponse } from "next/server";

// let pastes: any = {}; // In-memory store (shared across requests)

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { content } = body;

//     if (!content || typeof content !== "string") {
//       return NextResponse.json({ error: "content is required" }, { status: 400 });
//     }

//     const id = "test-" + Date.now();
    
//     // Store paste in shared memory
//     pastes[id] = {
//       content,
//       remaining_views: null,
//       expires_at: null
//     };

//     return NextResponse.json({
//       id,
//       url: `http://localhost:4000/p/${id}`
//     }, { status: 201 });
//   } catch (err) {
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
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

// async function savePastes(pastes: Record<string, any>) {
//   await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
//   await fs.writeFile(DATA_FILE, JSON.stringify(pastes, null, 2));
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { content } = body;

//     if (!content || typeof content !== "string") {
//       return NextResponse.json({ error: "content is required" }, { status: 400 });
//     }

//     const pastes = await loadPastes();
//     const id = "test-" + Date.now();
    
//     pastes[id] = {
//       content,
//       remaining_views: null,
//       expires_at: null
//     };

//     await savePastes(pastes);
//     console.log("✅ POST SAVED:", id);

//     return NextResponse.json({
//       id,
//       url: `http://localhost:4000/p/${id}`
//     }, { status: 201 });
//   } catch (err) {
//     console.error("POST Error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }






// import { NextResponse } from "next/server";
// import { savePaste } from "@/lib/pastes";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { content } = body;

//     if (!content || typeof content !== "string") {
//       return NextResponse.json({ error: "content is required" }, { status: 400 });
//     }

//     const id = "test-" + Date.now();
    
//     await savePaste(id, {
//       content,
//       remaining_views: null,
//       expires_at: null
//     });

//     console.log("✅ POST SAVED:", id);

//     return NextResponse.json({
//       id,
//       url: `http://localhost:4000/p/${id}`
//     }, { status: 201 });
//   } catch (err) {
//     console.error("POST Error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }




import { NextResponse } from "next/server";
import { savePaste } from "@/lib/pastes";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, ttl_seconds, max_views } = body;

    // VALIDATION
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }
    if (ttl_seconds !== undefined && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
      return NextResponse.json({ error: "ttl_seconds must be >= 1" }, { status: 400 });
    }
    if (max_views !== undefined && (!Number.isInteger(max_views) || max_views < 1)) {
      return NextResponse.json({ error: "max_views must be >= 1" }, { status: 400 });
    }

    const id = "paste-" + Date.now();
    const nowMs = Date.now();
    
    // FIX: Store NUMBER or null properly
    const remainingViews = max_views ? Number(max_views) : null;
    
    await savePaste(id, {
      content: content.trim(),
      created_at: nowMs,
      remaining_views: remainingViews,  // NUMBER not null
      expires_at: ttl_seconds ? nowMs + (ttl_seconds * 1000) : null,
    });

    console.log("✅ POST SAVED:", id, "Views:", remainingViews);

    return NextResponse.json({
      id,
      url: `http://localhost:4000/p/${id}`
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

