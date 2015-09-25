<!DOCTYPE html>
<html>
	<head>	
		<link rel="stylesheet" href="style.css?v=<?php echo rand(); ?>" />
		<link rel="stylesheet" href="icons.css?v=<?php echo rand(); ?>" />
		<link href="champions.ico" rel="shortcut icon" type="image/x-icon">
		<link href='https://fonts.googleapis.com/css?family=RobotoDraft:400,500,700,400italic' rel='stylesheet' type='text/css'>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<script src="jquery-2.1.0.min.js"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<script src="AllChampions.js?v=<?php echo rand(); ?>"></script>		
		<script src="WinRates.js?v=<?php echo rand(); ?>"></script>
		<script src="PickRates.js?v=<?php echo rand(); ?>"></script>
		<script src="patchInfo.js?v=<?php echo rand(); ?>"></script>		
		<script src="ChampionChanges.js?v=<?php echo rand(); ?>"></script>
		<script src="actions.js?v=<?php echo rand(); ?>"></script>

		<script src="dist/jquery.jqplot.js"></script>
		
		<script class="include" type="text/javascript" src="dist/plugins/jqplot.dateAxisRenderer.min.js"></script>
		<script class="include" type="text/javascript" src="dist/plugins/jqplot.logAxisRenderer.min.js"></script>
		<script class="include" type="text/javascript" src="dist/plugins/jqplot.canvasTextRenderer.min.js"></script>
		<script class="include" type="text/javascript" src="dist/plugins/jqplot.canvasAxisTickRenderer.min.js"></script>
		<script class="include" type="text/javascript" src="dist/plugins/jqplot.enhancedLegendRenderer.min.js"></script>	
		<script class="include" type="text/javascript" src="dist/plugins/jqplot.highlighter.min.js"></script>
		
		<script type="text/javascript" src="dist/plugins/jqplot.canvasOverlay.min.js"></script>
		<script type="text/javascript" src="dist/plugins/jqplot.canvasTextRenderer.min.js"></script>
		<script type="text/javascript" src="dist/plugins/jqplot.canvasAxisLabelRenderer.min.js"></script>	
		
		
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-50407764-1', 'how2win.pl');
		  ga('create', 'UA-36903788-1', 'auto', {'name': 'how2win'});
		  ga('send', 'pageview');
		  ga('how2win.send', 'pageview');

		</script>
		
		<title>
			LOL Champions Analyzer
		</title>
	</head>
	
	
	<body class="">	
			
		<div id="page" >
			<div id="navigation"> <span id="title">LOL Champions Analyzer </span>
				<div class="burger_menu black">
					<div class="bar lvl1"><div class="line"></div></div>
					<div class="bar lvl2"><div class="line"></div></div>
					<div class="bar lvl3"><div class="line"></div></div>
				</div>			
			</div>				
			<div id="content">			
				<div id="chartarea">					
					<div id="chartBackground"></div>
					<div id="chartTitle"></div>
					<div id="chart"></div>			
										
				</div>				
				<div id="belowchart">				
					<div id="mobile"></div>		
					
					<div id="championsOrderFilters" class="filters">
						<div id="byChampion"  class="filter"  title="sort by champion name">champion name <i class="material-icons">expand_more</i></div>
						
						<div id="byPopularity" class="filter"  title="sort by popularity">popularity <i class="material-icons">expand_more</i></div>
						<div id="byPopularityDifference" class="filter" title="sort by difference in popularity">popularity change <i class="material-icons">expand_more</i></div>
						
						<div id="byWinrate" class="filter"  title="sort by win rate">winrate <i class="material-icons">expand_more</i></div>
						<div id="byWinRateDifference" class="filter selected" title="sort by difference in win rate">winrate change <i class="material-icons">expand_more</i></div>
					</div>		
					
					<div id="title_top">Top 10</div>			
					<div id="title_last">Last 10</div>			
					<div id="title_all_the_rest">All the rest <i class="material-icons">expand_more</i></div>					
					<div id="championsList" class="byWinRateDifference"></div>		
					
					<div id="nameFilter">
						<span>filter by name:</span><br/>
						<input id="NameInput" type="text"></input>
					</div>		
					
					<div id="footer" style="display:none;">
						<script type="text/javascript">
							var $patch = getTwoLastPatches();							
							document.write('<div id="patchwiki"><a href="http://na.leagueoflegends.com/en/news/game-updates/patch/patch-'+$patch[1][1].substring(7).replace('.','')+'-notes"><span class="important">view full patch notes '+$patch[1][1].substring(6)+'</span></a></div>');
						</script>
						<div id="author"><a href="mailto:adrian.krzysztofek@gmail.com?subject=LOL%20Champions%20Analyzer"><span class="important">contact author</span></a></div>
						<div id="lolking"><a href="http://www.lolking.net/champions/"><span class="regular">win/pick rate data comes from</span> <span class="important">LOLKING.NET</span></a></div>
						<!--<div id="lolking"><a href="http://loldb.gameguyz.com/"><span class="regular">win/pick rate data comes from LOLDB.GAMEGUYZ.COM</span></a></div>-->
						<div id="hosting"><a href="http://how2win.pl/"><span class="regular">powered by </span><span class="important">how2win.pl</span></a></div>
					</div>
					<div class="clearboth" style="clear:both;">
					</div>
					
				</div>
				<div id="champion_change_box"></div>
			</div>						
		</div>
	</body>
</html>