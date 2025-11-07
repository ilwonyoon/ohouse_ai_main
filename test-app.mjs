import { chromium } from 'playwright';

(async () => {
  console.log('🎬 Starting Playwright browser test...\n');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });

  try {
    console.log('📍 Navigating to http://localhost:3000/ai-consultation');
    await page.goto('http://localhost:3000/ai-consultation', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('⏳ Waiting 3 seconds for React hydration and greeting message...\n');
    await page.waitForTimeout(3000);

    const pageContent = await page.textContent('body');

    console.log('🔍 Checking for greeting message...\n');
    const hasGreeting = pageContent.includes("I'm your AI interior design consultant") ||
                        pageContent.includes("Let's start!");

    if (hasGreeting) {
      console.log('✅ GREETING MESSAGE FOUND!');
    } else {
      console.log('❌ GREETING MESSAGE NOT FOUND');
      console.log('\n📄 Page content (first 1500 chars):');
      console.log(pageContent.substring(0, 1500));
      console.log('\n');
    }

    console.log('✅ Checking other elements...\n');

    const hasInput = await page.locator('input[placeholder*="message"]').count() > 0;
    console.log(`  Input field: ${hasInput ? '✅' : '❌'}`);

    const hasSendButton = await page.locator('button').filter({ hasText: 'Send' }).count() > 0;
    console.log(`  Send button: ${hasSendButton ? '✅' : '❌'}`);

    const hasHeader = pageContent.includes('Interior Design Consultant');
    console.log(`  Header: ${hasHeader ? '✅' : '❌'}`);

    const hasMetadata = pageContent.includes('Project Metadata');
    console.log(`  Metadata panel: ${hasMetadata ? '✅' : '⚠️ (desktop only)'}`);

    console.log('\n🖼️  Taking screenshot...');
    await page.screenshot({ path: './app_screenshot.png', fullPage: true });
    console.log('✅ Screenshot saved to ./app_screenshot.png\n');

    console.log('═══════════════════════════════════════════════════════');
    if (hasGreeting && hasInput && hasSendButton && hasHeader) {
      console.log('✅ ALL CRITICAL TESTS PASSED!');
      console.log('\nThe application is working correctly:');
      console.log('  ✅ Page loads');
      console.log('  ✅ Greeting message displays');
      console.log('  ✅ Input field present');
      console.log('  ✅ Send button present');
      console.log('  ✅ Header visible');
    } else {
      console.log('⚠️  SOME TESTS FAILED');
      console.log('\nResults:');
      console.log(`  Greeting message: ${hasGreeting ? '✅' : '❌'}`);
      console.log(`  Input field: ${hasInput ? '✅' : '❌'}`);
      console.log(`  Send button: ${hasSendButton ? '✅' : '❌'}`);
      console.log(`  Header: ${hasHeader ? '✅' : '❌'}`);
    }
    console.log('═══════════════════════════════════════════════════════');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
})();
