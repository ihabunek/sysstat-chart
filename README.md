SYSSTAT chart
=============

A simple HTML chart for displaying CPU data collected by
[SYSSTAT](http://sebastien.godard.pagesperso-orange.fr/).

Requires PHP and a web server.

Setup
-----

1. Install SYSSTAT and enable collection of statistics (see SYSSTAT docs).

2. Checkout the project code (e.g. to `~/stats`).
   ```
   git clone https://github.com/ihabunek/sysstat-chart.git ~/stats
   ```

3. Create a symlink for `~/stats/www` in your public html folder; e.g. for nginx:
   ```
   ln -s ~/stats/www/ /usr/share/nginx/html/stats
   ```

4. Add cron task to regenerate chart data in deisred intervals.
   ```
   0 * * * * php ~/stats/bin/parse_stats.php > ~/stats/www/data.js
   ```

Wait for cron to run once, or run it manually.

Point your browser to your_host/stats.

Done.
