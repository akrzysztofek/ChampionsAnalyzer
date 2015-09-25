<!DOCTYPE html>
<html>
	<head>	
		<link rel="stylesheet" href="style.css?v=<?php echo rand(); ?>" />
		<link rel="stylesheet" href="flairs.css?v=1" />
		<script src="jquery-2.1.0.min.js"></script>
		
		<script src="AllChampions.js?v=<?php echo rand(); ?>"></script>		
		<script src="WinRates.js?v=<?php echo rand(); ?>"></script>
		<script src="PickRates.js?v=<?php echo rand(); ?>"></script>
		<script src="patchInfo.js?v=<?php echo rand(); ?>"></script>
		<script src="actions.js?v=<?php echo rand(); ?>"></script>
		<script src="dist/jquery.jqplot.min.js"></script>
		
		<script class="include" type="text/javascript" src="dist/plugins/jqplot.dateAxisRenderer.min.js"></script>
		<script class="include" type="text/javascript" src="dist/plugins/jqplot.logAxisRenderer.min.js"></script>
		<script class="include" type="text/javascript" src="dist/plugins/jqplot.canvasTextRenderer.min.js"></script>
		<script class="include" type="text/javascript" src="dist/plugins/jqplot.canvasAxisTickRenderer.min.js"></script>
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
		
		<title>LOL Champions Analyzer</title>
	</head>
	<body>		
		<div id="page">		
			<div id="page_title">LOL Champions Analyzer</div>
			<div id="content">			
				<div id="chartarea">
					<div id="chartBackground"><div id="blackCover"></div></div>
					<div id="chartTitle"></div>
					<div id="chart"></div>
					<div id="chartFilters" class="filters"><div class="filter selected">ranked solo</div></div>				
				</div>
				<div id="champion_change_box" style="display:none; color:white;">
					loading list of changes...
				</div>
				<div id="belowchart">
					<div id="championsList"></div>			
					<div id="championsOrderFilters" class="filters">
						<div id="byChampion"  title="sort by champion name">champion</div>
						<div id="byPopularity"  title="sort by popularity">popularity</div>
						<div id="byWinrate"  title="sort by win rate">winrate</div>
						<div id="byDifference" class="filter selected" title="sort by difference in win rate">difference</div>
					</div>					
					<div id="nameFilter">
						<span>filter by name:</span><br/>
						<input id="NameInput" type="text"></input>
					</div>		
					<div id="currentPatchOnly" class="filters">
						<div class="selected">
						<script type="text/javascript">
							var $patch = getTwoLastPatches();							
							document.write('Display '+$patch[1][1].substring(6)+' changes only');
						</script>
						</div>
					</div>					
					<div id="championRolesFilter" class="filters">
						<div>Assasin</div>
						<div>Fighter</div>
						<div>Mage</div>
						<div>Support</div>
						<div>Tank</div>
						<div>Marksman</div>
					</div>	
					<div id="footer">
						<script type="text/javascript">
							var $patch = getTwoLastPatches();							
							document.write('<div id="patchwiki"><a href="http://leagueoflegends.wikia.com/wiki/V'+$patch[1][1].substring(7)+'">view full patch notes '+$patch[1][1].substring(6)+'</a></div>');
						</script>
						<div id="author"><a href="http://www.adrian-krzysztofek.co.nf/">see more about author</a></div>
						<div id="lolking"><a href="http://www.lolking.net/champions/">win/pick rate data comes from LOLKING.NET</a></div>
						<div id="hosting"><a href="http://how2win.pl/">powered by how2win.pl</a></div>
					</div>
					<div class="clearboth" style="clear:both;"></div>
				</div>
				<div id="RequiredToKeepThePageUp_PleaseDontBlock">
					<script type='text/javascript' src='http://ads.qadserve.com/t?id=306678a0-3d9a-469d-b862-a2fc2a668a0e&size=160x600'></script>
					<span id="support"><strong>Do you want to support this site?</strong><br/>Disable adblock and click <strong>single</strong> AD located above this text. <br/><strong>Thank you!</strong></span>
				</div>
				
				
			</div>
		</div>
	</body>
</html>