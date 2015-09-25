var Champions = {};
Champions.Changes = {};
Champions.SortingList = {};
var Animations = {};
var $version = '0.9';

Animations.ChampionsGridLoadStart = function ()
{
	//$('#championsList').css({'transform':'translate3d(100%,0,0)'});	
	$('#championsList').css({'opacity':'0'});	
}

Animations.ChampionsGridLoadEnd = function ()
{		
	$('#championsList').css({'opacity':'1'});
}

Champions.SortingList.RegisterEvents = function () {
	$('#championsOrderFilters').click(function (event) {
		event.stopPropagation();
		Champions.SortingList.ToggleVisibility();	
	});
	
	
	$('body').click(function () {
		if ($('#championsOrderFilters').attr('class').indexOf('expanded') > -1) {
			Champions.SortingList.ToggleVisibility();
		}
	});
}
Champions.SortingList.ToggleVisibility = function () {
	if ($('#championsOrderFilters').attr('class').indexOf('expanded') == -1) {
		$('#championsOrderFilters').toggleClass('expanded',true);
		}
	else{
		$('#championsOrderFilters').toggleClass('expanded',false);		
	}	
}

Champions.ManageAllChampionsVisibility = function () {
	$('#title_all_the_rest').click(function(){
		if ($('#championsList').attr('class').indexOf('all') == -1) {
			$('#championsList').toggleClass('all',true);
			$(this).toggleClass('all',true);
			//$(this).children('.material-icons').html('expand_less');
		}
		else{
			$('#championsList').toggleClass('all',false);
			$(this).toggleClass('all',false);			
			//$(this).children('.material-icons').html('expand_more');
		}		
	});
}

Champions.Changes.GetChangesForSelectedChampion = function ($champion)
{		  
	var json = getLastChampionsChangesJSON();
	var $result = 'empty';
	for (var $i = 0; $i< json.patch_changes.length; $i++)
	{
		if (json.patch_changes[$i].name.toLowerCase() == $champion)
		{
			var $champion_row = '<div class="title_bar" >' + GetChampionFullName(json.patch_changes[$i].name)+ '</div>';
			$skill_letter = '';
			for (var $j = 0; $j < json.patch_changes[$i].changes.length; $j++)
			{				
				if (json.patch_changes[$i].changes[$j].skill_letter != $skill_letter)
				{
					$skill_letter = json.patch_changes[$i].changes[$j].skill_letter;
					//print skill name row
					var $skillname_row = json.patch_changes[$i].changes[$j].skill_letter;
					if (json.patch_changes[$i].changes[$j].skill_name != null && json.patch_changes[$i].changes[$j].skill_name != "")
					{
						$skillname_row += ' - ' + json.patch_changes[$i].changes[$j].skill_name;
					}
					$champion_row += '<div class="changerow header"><span class="skillname">'+ $skillname_row + '</span></div>';
				}
				//print skill changes row
				$champion_row += '<div class="changerow"><span class="description">'+json.patch_changes[$i].changes[$j].description + '</span></div>';
			}													
			$result = $champion_row;
		}				
	}	
	
	if ($result != 'empty')
	{
		$result += '<div class="close">click anywhere inside this window to close it</div>';
		$('#champion_change_box').html($result);
		
		$('#champion_change_box').unbind('click').click(function(){
			$('#champion_change_box').toggleClass('visible',false);
		});
		
		$('#champion_change_box').toggleClass('visible',true);				
	}	
}

$(document).ready(function () {
	var $patch = getTwoLastPatches();								
	$('title').html($patch[1][1].substring(6) + ' - LOL Champions Analyzer');
	
	$('#navigation #title').html($('#navigation #title').html() + $patch[1][1].substring(6));
	
	$championsGrid = LoadChampionsGrid();
	printGrid($championsGrid);
	
	$('#championsOrderFilters div').click(function(event){ 
		if ($(this).parent().attr('class').indexOf('expanded')> -1
			&& $(this).attr('class').indexOf('selected') == -1)
			championsOrderClickEvent(event, $(this));
		});		
	$('#timefilters div').click(setDataPeriod);
	$('#NameInput').keyup(filterListByStringInput);
	PreLoadChart(getFeaturedChampionName());
	
	$('#NameInput').click(function(){
		$('#championRolesFilter div.selected').click();
	});	
	
	$('#currentPatchOnly div').click(function(){			
		$(this).toggleClass('selected', $(this).attr('class') != 'selected');
	
		$championsGrid = LoadChampionsGrid();
		printGrid($championsGrid);
	});		
	
	
	 $('#navigation').click(function () {
        if ($('Body').attr('class').indexOf('expanded') == -1) {
            $('Body').toggleClass('expanded', true);
            $('Body').toggleClass('collapsed', false);
        }
        else {
            $('Body').toggleClass('collapsed', true);
            $('Body').toggleClass('expanded', false);
        }
    });
	
	Champions.ManageAllChampionsVisibility();
	Champions.SortingList.RegisterEvents();	
	
});

function filterListByStringInput()
{
	$inputLowerCase = $('#NameInput').val().toLowerCase();

	if ($inputLowerCase != '')
	{
		$('#championsList .champion .name').each(function (){
			if ($(this).html().toLowerCase().indexOf($inputLowerCase) == -1 && getNickname($(this).html().toLowerCase()) != $inputLowerCase)
			{				
				$(this).parent().hide();
			}
			else
			{
				$(this).parent().show();
			}
		})		
	}
	else
	{
		$('#championsList .champion').show();
	}
}

function getNickname(champion)
{
	switch (champion)
	{
		case 'varus':
		case 'taric':
		case 'ezreal':
			return 'gay';
			break;
		case 'teemo':
			return 'devil';
			break;
		case 'heimerdinger':
			return 'donger';
			break;
		case 'malphite':
			return 'rock';
			break;
		case 'alistar':
			return 'cow';
			break;
		case 'trundle':
			return 'troll';
			break;
		case 'amumu':
			return 'mummy';
			break;
		case 'wukong':
			return 'monkey';
			break;
	}
	
	return '';
}

function championsOrderClickEvent(event, $sender)
{
		Animations.ChampionsGridLoadStart();
		$('#championsOrderFilters div.selected').toggleClass('selected', false);		
		$sender.toggleClass('selected', true);	
		
		$('#championsSortedBy').html($sender.html() + '<i class="material-icons">expand_more</i>');
		
		var $championsListClass= $sender.attr('id');
		if ($('#championsList').attr('class').indexOf('all') > -1)
			$championsListClass += ' all';
			
		$('#championsList').attr('class',$championsListClass);
		
		$championsGrid = '';
		
		setTimeout(function(){
			$championsGrid = LoadChampionsGrid();
		}, 500);		
		
		setTimeout(function(){
			printGrid($championsGrid);
		}, 1000);				
}

function setDataPeriod()
{
	$('#timefilters div.selected').toggleClass('selected', false);		
	$(this).toggleClass('selected', true);	
	LoadChampionsList();
	filterListByStringInput();	
}

function SortChampions($grid){
	switch ($('#championsOrderFilters div.selected').attr('id'))
	{
		case 'byWinrate': 			
			$grid = $grid.sort(sortByWinRate);			
		break;
		
		case 'byChampion': 
			$grid = $grid.sort(sortByChampionName);
		break;
		
		case 'byPopularity': 
			$grid = $grid.sort(sortByPopularity);
		break;
		
		case 'byWinRateDifference':
			$grid = $grid.sort(sortByDifferenceInWinRate);
		break;
		
		case 'byPopularityDifference':
			$grid = $grid.sort(sortByDifferenceInPopularity);
		break;
	}	
	
	return $grid;
}

function GetChampionFullName($name)
{
	var champions = $.parseJSON(AllChampions());	
	
	return champions[$name].name;
}

function LoadChampionsGrid()
{	
	var champions = $.parseJSON(AllChampions());	
		$avgPeriod = "1 day";		
		
	$patches = getTwoLastPatches();	
	var start = new Date("2015-"+ $patches[1][0].split('/')[0]+"-"+ $patches[1][0].split('/')[1] + " 14:00");
	var end =  new Date();

	// end - start returns difference in milliseconds 
	var diff = new Date(end - start);

	// get days
	var days = diff/1000/60/60/24;
	days--;
	
	if (days > 3) $avgPeriod = "3 days";
	if (days > 7) $avgPeriod = "7 days";	
	
	
	$grid = [];
	$index = 0;
	$.each(champions, function(i,item){
		
		var champPickDetails;
		 try {
			champPickDetails = $.parseJSON(NormalizedChampionPickRate(item.file));	
		 } catch (e) {
			// error
			champPickDetails = 'null';
		 }
		  
		 var champWinDetails;
		 try {
			champWinDetails = $.parseJSON(NormalizedChampionWinRate(item.file));	
		 } catch (e) {
			// error
			champWinDetails = 'null';
		 }
		  		
		if (champPickDetails != 'null' && champWinDetails != 'null')
		{
			$winrate = 0;
			$pickrate = 0;
			
			$grid[$index] = [];
			$grid[$index][0] = item.file;
			
			switch($avgPeriod)
			{
				case "1 day":
					$grid[$index][1] = champWinDetails.avg1day;
					$grid[$index][2] = champPickDetails.avg1day;
				break;
				
				case "3 days":
					$grid[$index][1] = champWinDetails.avg3days;
					$grid[$index][2] = champPickDetails.avg3days;
				break;

				case "7 days":
					$grid[$index][1] = champWinDetails.avg7days;
					$grid[$index][2] = champPickDetails.avg7days;
				break;
			}
					
			$grid[$index][3] = champWinRateChange(champWinDetails);	
			$grid[$index][4] = item.name;
			$grid[$index][5] = champPopularityChange(champPickDetails);
			
			$index++;
		}
	});	
	
	$grid = SortChampions($grid);	
	return $grid;
}

function printGrid($grid)
{
	Animations.ChampionsGridLoadEnd();
	$prevSelection = $('div.champion.row.selected');
	$htmlTable = "";	
	
	var allChangesJSON = getLastChampionsChangesJSON();
	
	for ($index = 0; $index < $grid.length; $index++)
	{		
		$importance = ' normal';
		
		if ($index < 10)
			$importance = ' selected5 top no' + ($index+1);
		else if($index >= 10 && $index <= 33)
			$importance = ' normal good';
		else if($index >= ($grid.length - 34) && $index <= ($grid.length - 11))
			$importance = ' normal bad';
		else if ($index > $grid.length - 11)
			$importance = ' selected5 last no' + ($index - $grid.length + 11);
			
		
		$changeSv = $grid[$index][3] > 0 ? '+' + $grid[$index][3] : $grid[$index][3];
		if (isNaN($grid[$index][3])) $changeSv = '???';
		
		$pChangeSv = $grid[$index][5] > 0 ? '+' + $grid[$index][5] : $grid[$index][5];
		
		$wrChangeDivString = '<div class="wrchange"><div class="value">'+$changeSv +'</div></div>';
		$pChangeDivString = '<div class="pchange"><div class="value">'+$pChangeSv +'</div></div>';
				
		$class =  '';		
		$changesIcon = '';
					
		var $champion = $grid[$index][0];
		var $result = 'empty';
		for (var $i = 0; $i< allChangesJSON.patch_changes.length; $i++)
		{				
			if (allChangesJSON.patch_changes[$i].name.toLowerCase() == $champion)
			{	
				$class += " lastpatch";		
				$changesIcon = '<i class="material-icons">build</i>';
			}
		}		
		
		
		$htmlTable += '<div class="champion row'+ $class + $importance+ '" code="'+$grid[$index][0]+'"><div class="name icon icon-'+$grid[$index][0]+'">' + $grid[$index][4] + '</div><div class="changeIcon" title="view recent changes">'+$changesIcon+'</div><div class="popularity"><div class="value">'+ $grid[$index][2] +'%</div></div>'+$pChangeDivString+'<div class="winrate"><div class="value">'+ $grid[$index][1] +'%</div></div>'+$wrChangeDivString+'</div>';			
	}
	
	$('#championsList').html($htmlTable + '<div class="last_row"></div>');
	
	if ($prevSelection != null)
	{
		$('div.champion[code='+ $prevSelection.attr('code') +']').toggleClass('selected',true);
	}
			
	$('div.champion.row').click(function(event){		
		var champion = '';
		var floatingChart = false;
		var displayChangesOnly = false;
		
		if ($(event.target).attr('class') == 'material-icons')
		{
			champion = $(event.target).parent().parent().attr('code');
		}
		
		if ( $(event.target).attr('class') == 'changeIcon')
		{
			champion = $(event.target).parent().attr('code');
		}
		
		if (champion != '')
		{			
			event.stopPropagation();
			
			setTimeout(function(){
				Champions.Changes.GetChangesForSelectedChampion(champion);
			}, 0);		

			displayChangesOnly = true;
		}
		else
		{						
			champion = $(this).attr('code');
			floatingChart = ( floatingChart || $(this).attr('class').indexOf('normal') > -1);					
		}		
				
		$('#page').toggleClass('floatingChart',floatingChart);
					
		$('#champion_change_box').toggleClass('visible',displayChangesOnly);
		
		if (!displayChangesOnly)
		{						
			PreLoadChart(champion);
		}
		else
		{
			$('#champion_change_box').show();
		}
	});		
}

function champPopularityChange($champData)
{
	$patches = getTwoLastPatches();		
	$patchDate1 = $patches[0][0];
	$patchDate2 = $patches[1][0];
	
	$beforePatch = 0;
	$afterPatch = 0;
	$lastValue = 0;
	
	$champData.values.forEach(function (item){	
	
		if ($beforePatch  == 0 && item.x == $patchDate2)
		{
			$beforePatch = $lastValue;
		}		
		
		$lastValue = item.y;				
	});		
	
	$afterPatch = $lastValue;
		
	$result = $afterPatch - $beforePatch;
	
	$result = Math.round($result * 100) / 100;
	
	return $result;
}

function champWinRateChange($champData)
{
	$patches = getTwoLastPatches();		
	$patchDate1 = $patches[0][0];
	$patchDate2 = $patches[1][0];
	
	$patch1avg = 0;
	$patch1sum = 0;
	$patch1count = 0;
	
	$champData.values.forEach(function (item){		
		if ($patch1count > 0 || $patch1count == 0 && item.x == $patchDate1 || $champData.name == 'newchampname' && item.x == $champData.values[0].x) {			
			if (item.y > 0)
			{
				$patch1sum += item.y;	
				$patch1count++;	
			
				if (item.x == $patchDate2)
				{
					$patch1avg = $patch1sum / $patch1count					
				}
			}
		}			
	});		
		
	$patch2avg = 0;
	$patch2sum = 0;
	$patch2count = 0;
	$champData.values.forEach(function (item){		
		if ($patch2count > 0 || $patch2count == 0 && item.x == $patchDate2) {		
			$patch2sum += item.y;	
			$patch2count++;				
		}
	});
	
	$patch2avg = $patch2sum / $patch2count
	$result = $patch2avg - $patch1avg;
	
	$result = Math.round($result * 100) / 100;

	if ($result > 20 || $result < -20)
		return '???';
	else
		return $result;
}

function sortByWinRate(a,b){
    return parseFloat(a[1]) < parseFloat(b[1]) ? 1 : -1;
}

function sortByPopularity(a,b){
    return parseFloat(a[2]) < parseFloat(b[2]) ? 1 : -1;
}

function sortByChampionName(a,b){
    return  a[0] > b[0] ? 1 : -1;
}

function sortByDifferenceInWinRate(a,b)
{
	n1 = isNaN(a[3])?'100':a[3];
	n2 = isNaN(b[3])?'100':b[3];

	return  parseFloat(n1) < parseFloat(n2) ? 1 : -1;
}

function sortByDifferenceInPopularity(a,b)
{
	return  parseFloat(a[5]) < parseFloat(b[5]) ? 1 : -1;
}

function sortJSON(source, prop, asc) {
    return arr.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]);
        else return (b[prop] > a[prop]);
    });   
}

function NormalizedChampionWinRate($name)
{
	var stringData = ChampionWinRate($name);
	
	var tmp1 = stringData.substring(stringData.indexOf(',"x":"11/25"') - 10);
	tmp1 = tmp1.substring(tmp1.indexOf('"y":'));
	var valueToUse = tmp1.substring(0, tmp1.indexOf(',"x"')+1);
	
	var counter = 0;
	while (stringData.indexOf('{"y":0,') > 0 && counter < 100)
	{
		counter += 1;
		stringData = stringData.replace("\"y\":0,", valueToUse);
	}	
	
	return stringData;
}

function NormalizedChampionPickRate($name)
{
	var stringData = ChampionPickRate($name);
	
	var tmp1 = stringData.substring(stringData.indexOf(',"x":"11/25"') - 10);
	tmp1 = tmp1.substring(tmp1.indexOf('"y":'));
	var valueToUse = tmp1.substring(0, tmp1.indexOf(',"x"')+1);
	
	var counter = 0;	
	while (stringData.indexOf('{"y":0,') > 0 && counter < 100)
	{
		counter += 1;
		stringData = stringData.replace("\"y\":0,", valueToUse);
	}	
	return stringData;
}

function ParseChampionData($name)
{
	$result = [];
	$result[0] = [];
	$result[1] = [];
	$result[2] = [];
	
	$index = 0;
	var stats = $.parseJSON(NormalizedChampionWinRate($name));	
	$.each(stats['values'], function(i,item){
		$result[0][$index] = ["2015-" + item.x.split('/')[0] +"-"+ item.x.split('/')[1], item.y];
		$index++;
	});
	
	$index = 0;
	var stats = $.parseJSON(NormalizedChampionPickRate($name));	
	$.each(stats['values'], function(i,item){
		$result[1][$index] = ["2015-" + item.x.split('/')[0] +"-"+ item.x.split('/')[1], item.y];		
		$index++;
	});
	
	$index = 0;
	var stats = $.parseJSON(NormalizedChampionWinRate($name));	
	$.each(stats['values'], function(i,item){
		$yVal = 0;
		if ($index > 5) {
			$yVal = (
					stats['values'][$index].y 
					+ stats['values'][$index - 1].y
					+ stats['values'][$index - 2].y
					+ stats['values'][$index - 3].y
					+ stats['values'][$index - 4].y
					+ stats['values'][$index - 5].y
					)
						
					/6.0;
		}
		else
		{
			$yVal= 0;
		}
		
		$result[2][$index] = ["2015-" + item.x.split('/')[0] +"-"+ item.x.split('/')[1], $yVal];		
		$index++;
	});
		
	return $result;
}
function getStartDate()
{
	var d = new Date();

	var month = d.getMonth(); // getMonth() - 0 - January, 1 - February
	var day = d.getDate()+5; //getDate() - returns day of the month
	if (day>28) day = 28;
	
	var tmpDate = d.getFullYear() + '-' +
		(month	<10 ? '0' : '') + month + '-' +
		(day	<10 ? '0' : '') + day;
		//*/
		
	// remove after 2015-02-01
	// tmpDate = '2015-02-10';
	
	return tmpDate;
}

function getStartDateForMobile()
{
	var d = new Date();

	var month = d.getMonth()+1; // getMonth()+1  =  1 - January, 2 - February
	var day = d.getDate(); //getDate() - returns day of the month
	
	var startDay = day - 10;  // 30 - 10 = 20;  10 - 10 = 0
	if (startDay < 1)
	{	// 0 (or minus)
		month = month -1; // start date is in last month
		startDay = 28 + startDay;  // 28 + 0 = 28;  (lowest possible 28 - 9 = 19) 
	}
		
	var tmpDate = d.getFullYear() + '-' +
		(month	<10 ? '0' : '') + month + '-' +
		(startDay	<10 ? '0' : '') + startDay;
		//*/
		
	// remove after 2015-02-01
	// tmpDate = '2015-02-10';
	
	return tmpDate;
}

function getTodaysDate()
{
	var d = new Date();

	var month = d.getMonth()+1;
	var day = d.getDate();

	var TodaysDate = d.getFullYear() + '-' +
		(month<10 ? '0' : '') + month + '-' +
		(day<10 ? '0' : '') + day;
		
	return TodaysDate;
}

function isMobile()
{
	if ($('#mobile').css('display') == 'block')
		return true;
	else
		return false;
}

function PreLoadChart($name)
{
	$('div.champion.row.selected').toggleClass('selected', false);
	$('div.champion.row[code="'+$name+'"]').toggleClass('selected', true);	
	
	var $ChampFullName = $('div.champion.row.selected .name').html();
	
	if ($ChampFullName == $('#chartTitle').html())
		return;
	
	$('#chartTitle').html($ChampFullName);
	
	setTimeout(function(){
		LoadChart($name);
	}, 10);
}


function LoadChart($name)
{
	var $interval = '2 days';
	var $showPopularityMarker = true;
	var $showWinrateMarker = true;
	var $legend3 = 'average winrate (6 days)';
	var $startDate = getStartDate(); 
	var $animation = true;
	
	if (isMobile())
	{
		$interval = '2 days';
		$showPopularityMarker = false;
		$showWinrateMarker = false;
		$legend3 = 'average winrate';
		$startDate = getStartDateForMobile();
		$animation = false;
	}
				
	$patches = getTwoLastPatches();		
		
	$('#chart').html('');
	$.jqplot('chart', ParseChampionData($name), 
	{ 	sortData : true, 
		grid: {gridLineColor: '#ddd', background: '#fff', shadow:false, borderWidth: 0}, 
		canvasOverlay: {
			show: true,
			objects: [
			  { rectangle: { ymax: 48, xminOffset: "0px", xmaxOffset: "0px", yminOffset: "0px", ymaxOffset: "0px", color: "rgba(255, 0, 0, 0.15)", showTooltip: false } },
			  { rectangle: { ymin: 52, xminOffset: "0px", xmaxOffset: "0px", yminOffset: "0px", ymaxOffset: "0px", color: "rgba(0, 255, 0, 0.15)", showTooltip: false } }, 
			  { rectangle: { ymin: 49.9, ymax: 50.1, xminOffset: "0px", xmaxOffset: "0px", yminOffset: "0px", ymaxOffset: "0px", color: "rgba(255, 255, 255, 0.2)", showTooltip: false } }, 
			  { dashedVerticalLine: {x: new $.jsDate($patches[0][2]).getTime(), lineWidth: 2, color: "rgba(0, 0, 0, 0.1)" , showTooltip: true, shadow:false, tooltipFormatString: $patches[0][1]} }, 
			  { dashedVerticalLine: {x: new $.jsDate($patches[1][2]).getTime(), lineWidth: 2, color: "rgba(0, 0, 0, 0.5)" , showTooltip: true, shadow:false, tooltipFormatString: $patches[1][1]} }
			  ]
		}, 
		series:[
			{
			yaxis:'yaxis', 
			label:'winrate',
			color: '#03a9f4',
			rendererOptions: {
				smooth: true, 
				constrainSmoothing: false
			},
			showMarker: $showWinrateMarker
			},
			{
			yaxis:'y2axis', 
			color: '#ff5722', 
			label:'popularity',
			rendererOptions: {
				smooth: true, 
				constrainSmoothing: false
			},
			showMarker: $showPopularityMarker
			},
			{
			yaxis:'yaxis', 
			label:$legend3, 
			color: '#000', 
			showMarker: false,
			 markerOptions: {				
				size: 4			
			}
			}	
		],
		seriesDefaults: {          
		},
		axes: {			
			xaxis: {				
				renderer: $.jqplot.DateAxisRenderer,			
				tickOptions: {
					formatString: "%m.%d ",
					textColor: '#999',
					showMark: false, 
					fontSize: 10
				},
				min: $startDate,
				max: getTodaysDate(),
				tickInterval: $interval,
				drawMajorGridlines: false
				
			},
			yaxis:{ min: 40, max:60, numberTicks: 11,
				tickOptions: {  
					formatString: "%d",
					fontSize: 10,				
					textColor: '#999',
					showMark: false
				}, 
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
				label: 'winrate %',
				labelOptions:{
					fontSize: '12pt',
					textColor: '#03a9f4'
				}				
			}, 
			
			y2axis:{ min: 0, max:50, numberTicks: 11,
				tickOptions: {  
					formatString: "%d",
					fontSize: 10,				
					textColor: '#999',
					showMark: false					
				}, 
				labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
				label: 'popularity %',
				labelOptions:{
					fontSize: '12pt',
					textColor: '#ff5722', 
					angle: 90
				}	
			}
		},
		
		highlighter: {
			show: true,
			sizeAdjust: 1,
			tooltipOffset: -50, 
			sizeAdjust: 6,
			tooltipAxes: 'both',
			useAxesFormatters: false,
			tooltipContentEditor: function(str, seriesIndex, pointIndex, jqPlot) {

					return jqPlot.data[seriesIndex][pointIndex][0].replace('-','.').replace('-','.') + ', ' + parseFloat(jqPlot.data[seriesIndex][pointIndex][1]).toFixed(2)+ '%';

				}			
		}, 
				
		legend:{ 
			show:true,
			renderer: $.jqplot.EnhancedLegendRenderer,
			rendererOptions:{numberRows: 1, placement: 'outside'}, 
			location: 's', 
			marginTop: '30px', 
			background: '#fff'
		}				
	});

	$('.jqplot-highlighter-tooltip').addClass('ui-corner-all');
	
	
	
}




