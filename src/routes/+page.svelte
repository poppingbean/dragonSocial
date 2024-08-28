<script lang="ts">
  import { onMount } from 'svelte';

  // Load environment variables from Vite
  const telegramBotUsername = 'drgSocial_bot';
  const botAuthUrl = `https://telegram.me/${telegramBotUsername}?start=auth`;

  let telegramId = '';
  let friendId = '';

  // Check URL for Telegram ID after OAuth login
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    telegramId = urlParams.get('telegram_id') || '';
    if (telegramId) {
      registerUser(telegramId);
    }
  });

  async function registerUser(telegramId: string) {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramId })
    });
    const data = await response.json();
    console.log(data);
  }

  async function checkin() {
    const response = await fetch('/api/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramId })
    });
    const data = await response.json();
    console.log(data);
  }

  async function referFriend(friendId: string) {
    const response = await fetch('/api/referral', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referrerId: telegramId, referredId: friendId })
    });
    const data = await response.json();
    console.log(data);
  }
</script>

<div>
  <a href={botAuthUrl} class="telegram-login-button">Log in with Telegram</a>
  
  {#if telegramId}
    <p>Logged in as: {telegramId}</p>
    <button on:click={checkin}>Check-in</button>
    <input type="text" placeholder="Friend's Telegram ID" bind:value={friendId} />
    <button on:click={() => referFriend(friendId)}>Refer a Friend</button>
  {/if}
</div>

<style>
  .telegram-login-button {
    display: block;
    margin-bottom: 10px;
  }
  button {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
