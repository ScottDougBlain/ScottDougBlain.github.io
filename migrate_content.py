#!/usr/bin/env python3
"""
Content migration script for restructuring the website.
This script extracts specific sections from index.html and creates the new multi-page structure.
"""

import re
from pathlib import Path

def extract_section(content, start_marker, end_marker):
    """Extract content between two markers."""
    pattern = f"{re.escape(start_marker)}(.*?){re.escape(end_marker)}"
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return ""

def main():
    # Read the full index.html
    with open('index_full_backup.html', 'r', encoding='utf-8') as f:
        full_content = f.read()
    
    # Extract sections for About page
    print("Extracting sections for About page...")
    
    # Model Behavior Experience
    model_behavior = extract_section(full_content, 
        '<!-- Model Behavior Experience Section -->',
        '<!-- Why Psychology for AI Safety Section -->')
    
    # Why Psychology for AI Safety
    why_psychology = extract_section(full_content,
        '<!-- Why Psychology for AI Safety Section -->',
        '<!-- Research Pillars Section -->')
    
    # Career Focus / Current Mission
    career_focus = extract_section(full_content,
        '<!-- Career Focus Section -->',
        '<!-- Contact Section -->')
    
    # Extract sections for Pattern Recognition page
    print("Extracting Pattern Recognition content...")
    pattern_recognition = extract_section(full_content,
        '<!-- Pattern Recognition & Human Cognition -->',
        '<!-- Social Intelligence & AI Alignment -->')
    
    # Extract sections for Social Intelligence page
    print("Extracting Social Intelligence content...")
    social_intelligence = extract_section(full_content,
        '<!-- Social Intelligence & AI Alignment -->',
        '<!-- Cybernetic Personality Modeling -->')
    
    # Extract sections for Personality Modeling page
    print("Extracting Personality Modeling content...")
    personality_modeling = extract_section(full_content,
        '<!-- Cybernetic Personality Modeling -->',
        '<div class="future-directions">')
    
    # Extract Future Directions
    future_directions = extract_section(full_content,
        '<div class="future-directions">',
        '</section>')
    
    # Print summaries
    print(f"\nExtracted content lengths:")
    print(f"Model Behavior: {len(model_behavior)} chars")
    print(f"Why Psychology: {len(why_psychology)} chars")
    print(f"Career Focus: {len(career_focus)} chars")
    print(f"Pattern Recognition: {len(pattern_recognition)} chars")
    print(f"Social Intelligence: {len(social_intelligence)} chars")
    print(f"Personality Modeling: {len(personality_modeling)} chars")
    print(f"Future Directions: {len(future_directions)} chars")
    
    # Save extracted sections for manual integration
    sections = {
        'about_model_behavior.html': model_behavior,
        'about_why_psychology.html': why_psychology,
        'about_career_focus.html': career_focus,
        'research_pattern_recognition.html': pattern_recognition,
        'research_social_intelligence.html': social_intelligence,
        'research_personality_modeling.html': personality_modeling,
        'future_directions.html': future_directions
    }
    
    for filename, content in sections.items():
        if content:
            output_path = Path('extracted_sections') / filename
            output_path.parent.mkdir(exist_ok=True)
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Saved: {output_path}")

if __name__ == "__main__":
    main()