<script>
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Load Luckysheet assets dynamically
    const loadScript = (src) => new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    const loadStyle = (href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };

    // Load from local crabtable (served at /crabtable/ when crabtable/dist exists)
    const base = '/crabtable/';
    loadStyle(base + 'plugins/css/pluginsCss.css');
    loadStyle(base + 'plugins/plugins.css');
    loadStyle(base + 'css/luckysheet.css');
    loadStyle(base + 'assets/iconfont/iconfont.css');

    // Load scripts sequentially
    (async () => {
      try {
        await loadScript(base + 'plugins/js/plugin.js');
        await loadScript(base + 'luckysheet.umd.js');
        
        // Initialize Luckysheet
        window.luckysheet.create({
          container: 'luckysheet',
          title: 'Crab Table',
          lang: 'en',
          data: [
            {
              "name": "Sheet1",
              "color": "",
              "status": "1",
              "order": "0",
              "data": [],
              "config": {},
              "index":0
            }
          ]
        });

        // Bridge for Agent interaction
        window.addEventListener('crabtable-external-req', (e) => {
          const { tc, sessionId } = e.detail;
          const { action, range, values, description } = tc.args;
          
          let result = "";
          try {
            switch (action) {
              case 'get_data':
                result = JSON.stringify(window.luckysheet.getluckysheetfile());
                break;
              case 'set_data':
                window.luckysheet.setRangeValue(values, { range: range });
                result = "OK: Applied data to " + (range || "active range");
                break;
              case 'clear':
                window.luckysheet.setRangeValue([], { range: "A1:Z100" }); // Simple clear
                result = "OK: Cleared sheet";
                break;
              case 'create_table':
                // Basic implementation of drawing a table
                if (values && values.length > 0) {
                  window.luckysheet.setRangeValue(values, { range: range || "A1" });
                  result = "OK: Created table: " + (description || "untitled");
                } else {
                  result = "Error: Missing values for create_table";
                }
                break;
              default:
                result = "Error: Unknown action " + action;
            }
          } catch (err) {
            result = "Error: " + err.message;
          }

          // Return result back to AgentSpace
          window.dispatchEvent(new CustomEvent('crabtable-external-res', {
            detail: { sessionId, result }
          }));
        });

      } catch (err) {
        console.error("Failed to load Luckysheet:", err);
      }
    })();
  });
</script>

<div class="view-container">
  <div id="luckysheet"></div>
</div>

<style>
  .view-container {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  #luckysheet {
    margin: 0px;
    padding: 0px;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
  }
</style>
