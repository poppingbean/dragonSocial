<script lang="ts">
    import { onMount } from 'svelte';
  
    const telegramBotUsername = 'drgSocial_bot';
    const botAuthUrl = `https://oauth.telegram.org/auth?bot_id=${telegramBotUsername}&embed=1&request_access=write`;
  
    onMount(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const telegramId = urlParams.get('telegram_id');
  
      if (telegramId) {
        registerUser(telegramId);
      }
    });
  
    async function registerUser(telegramId: string) {
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramId })
      });
    }
  </script>
  
  <a href={botAuthUrl} class="telegram-login-button">Log in with Telegram</a>
  