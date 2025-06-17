// src/app/api/collect-email/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // Create the data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Path to subscribers file
    const filePath = path.join(dataDir, 'subscribers.json');
    
    // Read existing subscribers or create empty array
    let subscribers = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      try {
        subscribers = JSON.parse(fileContent);
      } catch (e) {
        // If file exists but isn't valid JSON, start fresh
        subscribers = [];
      }
    }
    
    // Check if email already exists
    const emailExists = subscribers.some(entry => 
      typeof entry === 'object' 
        ? entry.email.toLowerCase() === email.toLowerCase()
        : entry.toLowerCase() === email.toLowerCase()
    );
    
    if (emailExists) {
      return NextResponse.json({
        success: true,
        message: 'You\'re already subscribed!'
      });
    }
    
    // Add new subscriber with timestamp
    subscribers.push({
      email,
      subscribed_at: new Date().toISOString()
    });
    
    // Write to file
    fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));
    
    // New subscriber added
    
    return NextResponse.json({
      success: true,
      message: 'Thanks for subscribing!'
    });
  } catch (error) {
    console.error('Error handling subscription:', error);
    return NextResponse.json(
      { message: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}