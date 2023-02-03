
# Allbridge Core Widget

Core Widget is a developer-friendly tool designed to streamline cross-chain swaps with Allbridge Core for third-party websites. The widget allows users to select source/destination chain and token, enter amounts to see the estimated fee and open the full Allbridge Core UI for finishing the transfer.

To embed Allbridge Core Widget to your website use the code below:

```html
<iframe src="https://corewidget.allbridge.io/?f=ETH&ft=USDT&t=BSC&tt=BUSD&theme=dark"></iframe>
```

All the following parameters are optional and control widget appearance and which chain/token is pre-selected by default.

Parameters:

- `f` - source blockchain (network the assets are transferred from), can be `ETH`, `TRX`, `BSC`, `SOL` or `POL`;
- `t` - destination blockchain (network the assets are transferred to), can be `ETH`, `TRX`, `BSC`, `SOL` or `POL`;
- `ft` - source token (token the user sends), can be `USDT`, `USDC`, `BUSD` or `DAI`, token should be supported by Allbridge Core on the source blockchain;
- `tt` - destination token (token the user receives), can be `USDT`, `USDC`, `BUSD` or `DAI`, token should be supported by Allbridge Core on the destination blockchain;
- `theme` - `light` (default) or `dark`, select the one which looks better with your website.

