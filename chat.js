
const clearBtn = document.querySelector('.clear-btn');
const chatMessages = document.getElementById('chatMessages');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    chatMessages.innerHTML = '';
  });
}

const searchBtn = document.querySelector('.search-btn');
const contactSearch = document.getElementById('contactSearch');
const contactsList = document.getElementById('contactsList');

if (searchBtn && contactSearch) {
  searchBtn.addEventListener('click', () => {
    contactSearch.focus();
  });
}

if (contactSearch) {
  contactSearch.addEventListener('input', () => {
    const query = contactSearch.value.toLowerCase();
    const contacts = contactsList.querySelectorAll('.contact-item');
    contacts.forEach(contact => {
      const nameEl = contact.querySelector('.contact-name');
      const name = nameEl.textContent.toLowerCase();
      if (name.includes(query)) {
        contact.style.display = 'flex';
      } else {
        contact.style.display = 'none';
      }
    });
  });
}

const moreBtn = document.querySelector('.more-btn');
if (moreBtn) {
  moreBtn.addEventListener('click', () => {
    addContact("New Contact", "Hi there...", "Now");
  });
}

function addContact(name, message, time) {
  const contactItem = document.createElement('div');
  contactItem.classList.add('contact-item');
  contactItem.innerHTML = `
    <div class="contact-icon">
      <img src="https://via.placeholder.com/40" alt="${name}" />
    </div>
    <div class="contact-details">
      <span class="contact-name">${name}</span>
      <span class="contact-message">${message}</span>
    </div>
    <div class="contact-time">${time}</div>
  `;
  contactsList.appendChild(contactItem);
}

// Chat Send Message Functionality
const sendMessageBtn = document.getElementById('sendMessageBtn');
const chatInput = document.getElementById('chatInput');

if (sendMessageBtn) {
  sendMessageBtn.addEventListener('click', sendMessage);
}

if (chatInput) {
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}

function sendMessage() {
  const msg = chatInput.value.trim();
  if (msg) {
    appendMessage(msg, 'user');
    chatInput.value = '';
    setTimeout(() => {
      appendMessage("I'm here to help.", 'bot');
    }, 1000);
  }
}

function appendMessage(text, sender) {
  const msgEl = document.createElement('div');
  msgEl.classList.add('chat-message', sender);

  const iconEl = document.createElement('img');
  iconEl.classList.add('message-icon');
  iconEl.src = sender === 'user'
    ? 'https://via.placeholder.com/30'
    : 'https://via.placeholder.com/30';
  iconEl.alt = sender;

  const contentEl = document.createElement('div');
  contentEl.classList.add('message-content');
  contentEl.textContent = text;

  msgEl.appendChild(iconEl);
  msgEl.appendChild(contentEl);
  chatMessages.appendChild(msgEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
