const api_host = "https://api.themcoldbloodeddrifters.com";

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initialize_about_section);
} else {
  initialize_about_section();
}

function initialize_about_section() {
  const about_wrapper = document.querySelector('.about_wrapper');
  const band_member_nav = document.querySelector('.band_member_nav');
  const band_member_nav_list = band_member_nav?.querySelector('ul');

  if (!about_wrapper || !band_member_nav || !band_member_nav_list) return;

  const section_map = {
  };

  const button_map = {
  };

  function make_member_section(id, name, portrait, bio, instrument) {
    const section = document.createElement("section");
    section.id = id;
    section.classList.add("member_wrapper");
    section.style.minHeight = "100vh";
  
    const img = document.createElement("img");
    img.src = portrait || 'https://placehold.co/300x700';
    img.alt = `${name}'s portrait`;
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    img.style.borderRadius = "8px";
  
    const portrait_photo_wrapper = document.createElement("div");
    portrait_photo_wrapper.classList.add("portrait_photo_wrapper");
    portrait_photo_wrapper.style.marginBottom = "1em";
    portrait_photo_wrapper.appendChild(img);
  
    const text_wrapper = document.createElement("div");
    text_wrapper.classList.add("text_wrapper");
  
    text_wrapper.innerHTML = `
      <h2>${name || "Unknown Member"}</h2>
      <p>${instrument || "Instrument Unknown"}</p>
      <div class="bio_wrapper">
        <p>${bio || "No bio available."}</p>
      </div>
    `;
  
    section.appendChild(portrait_photo_wrapper);
    section.appendChild(text_wrapper);
  
    return section;
  }
  
  function make_band_member_nav_entry(id, label) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${id}`;
    a.textContent = label;
    li.appendChild(a);
    return [li, a];
  }

  function render_subsection_default() {
    const id = 'subsection_default';
    const section = make_member_section(id, 'Default', null, 'Default member section content.');
    section.style.border = '3px dashed red';

    about_wrapper.appendChild(section);

    const [nav_entry, nav_link] = make_band_member_nav_entry(id, 'Default');
    band_member_nav_list.appendChild(nav_entry);

    section_map[id] = section;
    button_map[id] = nav_link;

    update_band_button_state(button_map, section_map);
  }

  function render_band_bio(name, memleftright, bio, photo) {
    const about_wrapper = document.querySelector('.about_wrapper');
  
    const section = document.createElement('section');
    section.classList.add('band_wrapper');
    section.id = 'the_band';
  
    const article = document.createElement('div');
    article.classList.add('article');
  
    const figure = document.createElement('figure');
    figure.classList.add('band_photo_wrapper');
  
    const img = document.createElement('img');
    img.src = photo || 'https://placehold.co/1280x720?text=Band+Photo';
    img.alt = 'Band Photo Placeholder';
  

    console.log('Band list left to right:', memleftright);
    const figcaption = document.createElement('div');
    figcaption.classList.add("lefttoright")
    figcaption.innerHTML = `${name} from left to right: ${memleftright || '(Enter here :))'}`;
  
    figure.appendChild(img);
    
  
    const aboutDiv = document.createElement('div');
    aboutDiv.classList.add('about_them_cbd_text');
  
    const p = document.createElement('p');
    p.id = 'about_band_text';
    p.textContent = bio || 'No bio available.';
  
    aboutDiv.appendChild(p);
  
    article.appendChild(figure);
    article.appendChild(figcaption);
    article.appendChild(aboutDiv);
  
    section.appendChild(article);
    
  
    about_wrapper.appendChild(section);
    
    const band_member_nav = document.querySelector('.band_member_nav');
    const band_member_nav_list = band_member_nav?.querySelector('ul');
    if (band_member_nav_list) {
      const [nav_entry, nav_link] = make_band_member_nav_entry(section.id,"The Band");
      band_member_nav_list.appendChild(nav_entry);
      section_map[section.id] = section;
      button_map[section.id] = nav_link;
    }

  }

  function render_band_bio_fallback() {
    const about_wrapper = document.querySelector('.about_wrapper');
    
    const section = document.createElement('section');
    section.classList.add('band_wrapper');
    section.id = 'the_band';
    
    const article = document.createElement('div');
    article.classList.add('article');
    
    const figure = document.createElement('figure');
    figure.classList.add('band_photo_wrapper');
    
    const img = document.createElement('img');
    img.src = 'https://placehold.co/1280x720?text=Band+Photo';
    img.alt = 'Band Photo Placeholder';
    
    const caption = document.createElement('div');
    caption.classList.add("lefttoright")
    caption.innerHTML = `Them Coldblooded Drifters from left to right: Enter Here`
    
    figure.appendChild(img);
    
    
    const aboutDiv = document.createElement('div');
    aboutDiv.classList.add('about_them_cbd_text');
    
    const p = document.createElement('p');
    p.id = 'about_band_text';
    p.class = "about_band_text"
    p.textContent = 'Them Coldblooded Drifters is a band from Salt Lake City, Utah, USA. We make groovy Groove Metal with a dash of everything else. We aim to provide a memorable experience for all whom enter our realm!';
    
    aboutDiv.appendChild(p);
    
    article.appendChild(figure);
    article.appendChild(caption);
    article.appendChild(aboutDiv);
    section.appendChild(article);
    about_wrapper.appendChild(section);
    const band_member_nav = document.querySelector('.band_member_nav');
    const band_member_nav_list = band_member_nav?.querySelector('ul');
    if (band_member_nav_list) {
      const [nav_entry, nav_link] = make_band_member_nav_entry(section.id,"The Band");
      band_member_nav_list.appendChild(nav_entry);
      section_map[section.id] = section;
      button_map[section.id] = nav_link;
    }
  }  

  function render_band_members(members) {
    members.forEach((member, index) => {
      const safe_name = member.name?.toLowerCase().replace(/\s+/g, '_') || "member";
      const id = `subsection_${index}_${safe_name}`;
      const section = make_member_section(
        id,
        member.name,
        member.portrait,
        member.bio,
        member.instrument
      );
  
      about_wrapper.appendChild(section);
  
      const [nav_entry, nav_link] = make_band_member_nav_entry(
        id,
        member.name || `Member ${index + 1}`
      );
      band_member_nav_list.appendChild(nav_entry);
  
      section_map[id] = section;
      button_map[id] = nav_link;
    });
  
    update_band_button_state(button_map, section_map);
  }
  

  function update_band_button_state(button_map, section_map) {
    let active_id = null;

    for (const [id, section] of Object.entries(section_map)) {
      const rect = section.getBoundingClientRect();
      const midpoint = window.innerHeight * 0.5;

      if (rect.top <= midpoint && rect.bottom >= midpoint) {
        active_id = id;
        break;
      }
    }

    for (const [id, button] of Object.entries(button_map)) {
      const active = id === active_id;
      button.classList.toggle("active_page_section_button", active);
      button.style.backgroundColor = active ? "white" : "rgba(83, 0, 47, 0.5)";
      button.style.color = active ? "black" : "white";
    }
  }

  let scroll_timeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scroll_timeout);
    scroll_timeout = setTimeout(() => {
      update_band_button_state(button_map, section_map);
    }, 10);
  });

  fetch(`${api_host}/about_data`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
    },)
    .then(res => {
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      return res.json();
    })
    .then(data => {
      const members = data?.members;
      const the_band = data.theband
      console.log('the_band:', the_band);
      if (!the_band || !the_band.band_list_left_to_right) {
        render_band_bio_fallback();
      } else {
        render_band_bio(the_band.name, the_band.band_list_left_to_right, the_band.bio, the_band.image, section_map, button_map);
      }
      

      if (Array.isArray(members) && members.length) {
        console.log("Loading Band Members: " + data.status);
        render_band_members(members);
      } else {
        render_subsection_default();
      }
    })
    .catch(() => {
      render_band_bio_fallback()
      render_subsection_default();
    });
}
