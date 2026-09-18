---
status: accepted
---

# Brand faces may be licensed; Registry Defaults must be open

The Dropblocs site sets its display role to Zuume Cut through Adobe Fonts, whose terms prohibit self-hosting and redistribution. The registry ships blocks to other people's projects, so every Registry Default value must be free to redistribute: system font stacks or open-licence faces. The site therefore never edits `packages/tokens`; it applies its brand only through its own Bridge File, exactly as a customer project would. Shipping one free condensed face as the default everywhere was rejected because no free face carries the brand and a licensed one cannot legally ship. The cost is that an unbranded install looks plainer than the site, and every block preview is checked against both the site's Bridge File and the raw Registry Defaults so a block never depends on the brand face to lay out correctly.
