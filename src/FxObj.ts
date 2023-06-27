import { prototype } from "events";

//const makeMap = <V = unknown>(obj:  Record<string, V>) => 
//  new Map<string, V>(Object.entries(obj))

//let arrayOfFxMaps: Array<Map<string, Object>> = [];

//-33			   450
//-30			   466
//-27			   490
//-24			   554
//-21			   804
//-18			  1086		0,125
//-15			  1518		0,178		
//-12			  2167		0,25
//-9			  3048		0,355
//-6			  4328		0,5
//-3			  6198		0,708
//0 db            8128		1
//1 db            8779      1.122
//2 db            9430      1.259
//+3db           10117		1.412   //wurzel 2
//4db            10795      1.585
//+6 db          12161		2
//+9 db          14097		2,82
//+12 db at      16256		4


//20 x log(IN/8128) = volume <=0 0db


const fx50 = ["20.6 Hz",
"21.2 Hz",
"21.8 Hz",
"22.4 Hz",
"23.1 Hz",
"23.8 Hz",
"24.5 Hz",
"25.2 Hz",
"26.0 Hz",
"26.7 Hz",
"27.5 Hz",
"28.3 Hz",
"29.1 Hz",
"30.0 Hz",
"30.9 Hz",
"31.8 Hz",
"32.8 Hz",
"33.7 Hz",
"34.7 Hz",
"35.7 Hz",
"36.8 Hz",
"37.9 Hz",
"39.0 Hz",
"40.2 Hz",
"41.4 Hz",
"42.6 Hz",
"43.9 Hz",
"45.2 Hz",
"46.5 Hz",
"47.9 Hz",
"49.3 Hz",
"50.7 Hz",
"52.2 Hz",
"53.8 Hz",
"55.4 Hz",
"57.0 Hz",
"58.6 Hz",
"60.4 Hz",
"62.2 Hz",
"64.0 Hz",
"66.0 Hz",
"67.9 Hz",
"69.9 Hz",
"72.0 Hz",
"74.1 Hz",
"76.3 Hz",
"78.6 Hz",
"80.9 Hz",
"83.3 Hz",
"85.7 Hz",
"88.3 Hz",
"90.9 Hz",
"93.6 Hz",
"96.3 Hz",
"99.2 Hz",
"102.1 Hz",
"105.1 Hz",
"108.2 Hz",
"111.4 Hz",
"114.7 Hz",
"118.1 Hz",
"121.6 Hz",
"125.2 Hz",
"128.9 Hz",
"132.7 Hz",
"136.6 Hz",
"140.7 Hz",
"144.8 Hz",
"149.1 Hz",
"153.5 Hz",
"158.1 Hz",
"162.7 Hz",
"167.5 Hz",
"172.4 Hz",
"177.6 Hz",
"182.8 Hz",
"188.2 Hz",
"193.7 Hz",
"199.5 Hz",
"205.4 Hz",
"211.5 Hz",
"217.6 Hz",
"224.1 Hz",
"230.7 Hz",
"237.6 Hz",
"244.5 Hz",
"251.8 Hz",
"259.1 Hz",
"266.9 Hz",
"274.7 Hz",
"283.0 Hz",
"291.2 Hz",
"299.9 Hz",
"308.6 Hz",
"317.8 Hz",
"327.1 Hz",
"337.1 Hz",
"347.1 Hz",
"357.4 Hz",
"367.6 Hz",
"378.5 Hz",
"389.5 Hz",
"401.2 Hz",
"412.9 Hz",
"425.3 Hz",
"437.6 Hz",
"450.8 Hz",
"463.9 Hz",
"477.8 Hz",
"491.7 Hz",
"506.5 Hz",
"521.2 Hz",
"536.9 Hz",
"552.4 Hz",
"569.0 Hz",
"585.5 Hz",
"603.1 Hz",
"620.6 Hz",
"639.3 Hz",
"657.8 Hz",
"677.6 Hz",
"697.2 Hz",
"718.2 Hz",
"739.0 Hz",
"761.3 Hz",
"783.3 Hz",
"806.9 Hz",
"830.2 Hz",
"855.3 Hz",
"880.4 Hz",
"906.5 Hz",
"933.1 Hz",
"960.9 Hz",
"989.1 Hz",
"1018.5 Hz",
"1048.4 Hz",
"1079.5 Hz",
"1111.2 Hz",
"1144.2 Hz",
"1177.9 Hz",
"1212.8 Hz",
"1248.5 Hz",
"1285.5 Hz",
"1323.4 Hz",
"1362.6 Hz",
"1402.7 Hz",
"1444.2 Hz",
"1486.8 Hz",
"1530.8 Hz",
"1576.0 Hz",
"1622.6 Hz",
"1670.4 Hz",
"1719.8 Hz",
"1770.6 Hz",
"1822.9 Hz",
"1876.8 Hz",
"1932.2 Hz",
"1989.2 Hz",
"2048.0 Hz",
"2108.5 Hz",
"2170.8 Hz",
"2235.0 Hz",
"2300.9 Hz",
"2368.9 Hz",
"2438.7 Hz",
"2510.9 Hz",
"2584.9 Hz",
"2661.5 Hz",
"2739.9 Hz",
"2821.0 Hz",
"2904.1 Hz",
"2990.2 Hz",
"3078.2 Hz",
"3169.4 Hz",
"3262.6 Hz",
"3359.4 Hz",
"3458.2 Hz",
"3560.8 Hz",
"3665.5 Hz",
"3774.3 Hz",
"3885.1 Hz",
"4000.5 Hz",
"4118.0 Hz",
"4240.4 Hz",
"4364.8 Hz",
"4494.6 Hz",
"4626.4 Hz",
"4764.0 Hz",
"4903.7 Hz",
"5049.6 Hz",
"5197.6 Hz",
"5352.4 Hz",
"5509.2 Hz",
"5673.3 Hz",
"5839.4 Hz",
"6013.4 Hz",
"6189.4 Hz",
"6373.8 Hz",
"6560.3 Hz",
"6756.0 Hz",
"6953.5 Hz",
"7161.0 Hz",
"7370.3 Hz",
"7590.2 Hz",
"7812.0 Hz",
"8045.2 Hz",
"8280.2 Hz",
"8527.5 Hz",
"8776.4 Hz",
"9038.7 Hz",
"9302.5 Hz",
"9580.6 Hz",
"9860.0 Hz",
"10154.9 Hz",
"10450.9 Hz",
"10763.7 Hz",
"11077.3 Hz",
"11408.9 Hz",
"11741.1 Hz",
"12092.8 Hz",
"12444.8 Hz",
"12817.7 Hz",
"13190.7 Hz",
"13586.1 Hz",
"13981.2 Hz",
"14400.4 Hz",
"14819.0 Hz",
"15263.7 Hz",
"15707.2 Hz",
"16178.7 Hz",
"16648.5 Hz",
"17148.5 Hz",
"17646.3 Hz",
"18176.4 Hz",
"18703.8 Hz",
"19265.9 Hz",
"19824.7 Hz",
"20420.8 Hz",
"21012.9 Hz",
"21645.0 Hz",
"22272.2 Hz",
"22942.4 Hz",
"23606.9 Hz",
"24317.6 Hz",
"25021.6 Hz",
"25775.3 Hz",
"26521.2 Hz",
"27320.3 Hz",
"28110.6 Hz",
"28958.0 Hz",
"29795.2 Hz",
"30693.7 Hz",
"31580.7 Hz",
"32533.6 Hz",
"33488.1 Hz"];

const fx67 = ["Off",
"20.9 Hz",
"21.2 Hz",
"21.5 Hz",
"21.8 Hz",
"22.1 Hz",
"22.4 Hz",
"22.7 Hz",
"23.1 Hz",
"23.4 Hz",
"23.8 Hz",
"24.1 Hz",
"24.5 Hz",
"24.9 Hz",
"25.2 Hz",
"25.6 Hz",
"26.0 Hz",
"26.4 Hz",
"26.8 Hz",
"27.1 Hz",
"27.5 Hz",
"27.9 Hz",
"28.3 Hz",
"28.7 Hz",
"29.1 Hz",
"29.6 Hz",
"30.0 Hz",
"30.5 Hz",
"30.9 Hz",
"31.4 Hz",
"31.9 Hz",
"32.3 Hz",
"32.8 Hz",
"33.2 Hz",
"33.7 Hz",
"34.2 Hz",
"34.7 Hz",
"35.2 Hz",
"35.8 Hz",
"36.3 Hz",
"36.8 Hz",
"37.4 Hz",
"37.9 Hz",
"38.5 Hz",
"39.0 Hz",
"39.6 Hz",
"40.2 Hz",
"40.8 Hz",
"41.4 Hz",
"42.0 Hz",
"42.6 Hz",
"43.3 Hz",
"43.9 Hz",
"44.5 Hz",
"45.2 Hz",
"45.8 Hz",
"46.5 Hz",
"47.2 Hz",
"47.9 Hz",
"48.6 Hz",
"49.3 Hz",
"50.0 Hz",
"50.8 Hz",
"51.5 Hz",
"52.2 Hz",
"53.0 Hz",
"53.8 Hz",
"54.6 Hz",
"55.4 Hz",
"56.2 Hz",
"57.0 Hz",
"57.8 Hz",
"58.6 Hz",
"59.5 Hz",
"60.4 Hz",
"61.3 Hz",
"62.2 Hz",
"63.1 Hz",
"64.1 Hz",
"65.0 Hz",
"66.0 Hz",
"66.9 Hz",
"67.9 Hz",
"68.9 Hz",
"69.9 Hz",
"70.9 Hz",
"72.0 Hz",
"73.0 Hz",
"74.1 Hz",
"75.2 Hz",
"76.3 Hz",
"77.4 Hz",
"78.6 Hz",
"79.7 Hz",
"80.9 Hz",
"82.0 Hz",
"83.3 Hz",
"84.5 Hz",
"85.7 Hz",
"87.0 Hz",
"88.3 Hz",
"89.6 Hz",
"90.9 Hz",
"92.2 Hz",
"93.6 Hz",
"94.9 Hz",
"96.3 Hz",
"97.7 Hz",
"99.2 Hz",
"100.6 Hz",
"102.1 Hz",
"103.5 Hz",
"105.1 Hz",
"106.7 Hz",
"108.2 Hz",
"109.8 Hz",
"111.4 Hz",
"113.0 Hz",
"114.7 Hz",
"116.3 Hz",
"118.1 Hz",
"119.8 Hz",
"121.6 Hz",
"123.4 Hz",
"125.2 Hz",
"127.0 Hz",
"128.9 Hz",
"130.7 Hz",
"132.7 Hz",
"134.7 Hz",
"136.6 Hz",
"138.6 Hz",
"140.7 Hz",
"142.7 Hz",
"144.8 Hz",
"146.9 Hz",
"149.1 Hz",
"151.3 Hz",
"153.5 Hz",
"155.8 Hz",
"158.1 Hz",
"160.4 Hz",
"162.7 Hz",
"165.1 Hz",
"167.5 Hz",
"170.0 Hz",
"172.4 Hz",
"175.0 Hz",
"177.6 Hz",
"180.2 Hz",
"182.8 Hz",
"185.5 Hz",
"188.2 Hz",
"191.0 Hz",
"193.8 Hz",
"196.6 Hz",
"199.5 Hz",
"202.5 Hz",
"205.4 Hz",
"208.4 Hz",
"211.5 Hz",
"214.6 Hz",
"217.7 Hz",
"220.9 Hz",
"224.1 Hz",
"227.5 Hz",
"230.7 Hz",
"234.1 Hz",
"237.6 Hz",
"241.1 Hz",
"244.5 Hz",
"248.1 Hz",
"251.8 Hz",
"255.5 Hz",
"259.2 Hz",
"263.0 Hz",
"266.9 Hz",
"270.9 Hz",
"274.8 Hz",
"278.8 Hz",
"283.0 Hz",
"287.1 Hz",
"291.3 Hz",
"295.6 Hz",
"299.9 Hz",
"304.3 Hz",
"308.7 Hz",
"313.2 Hz",
"317.8 Hz",
"322.5 Hz",
"327.2 Hz",
"332.1 Hz",
"337.1 Hz",
"342.1 Hz",
"347.1 Hz",
"352.3 Hz",
"357.4 Hz",
"362.5 Hz",
"367.6 Hz",
"373.0 Hz",
"378.5 Hz",
"384.1 Hz",
"389.6 Hz",
"395.4 Hz",
"401.2 Hz",
"407.1 Hz",
"413.0 Hz",
"419.1 Hz",
"425.3 Hz",
"431.6 Hz",
"437.7 Hz",
"444.2 Hz",
"450.8 Hz",
"457.5 Hz",
"464.0 Hz",
"470.9 Hz",
"477.8 Hz",
"484.9 Hz",
"491.8 Hz",
"499.1 Hz",
"506.5 Hz",
"513.9 Hz",
"521.3 Hz",
"529.1 Hz",
"536.9 Hz",
"544.8 Hz",
"552.5 Hz",
"560.8 Hz",
"569.0 Hz",
"577.4 Hz",
"585.6 Hz",
"594.4 Hz",
"603.1 Hz",
"612.0 Hz",
"620.7 Hz",
"630.1 Hz",
"639.3 Hz",
"648.7 Hz",
"657.9 Hz",
"667.8 Hz",
"677.6 Hz",
"687.6 Hz",
"697.4 Hz",
"707.9 Hz",
"718.2 Hz",
"728.8 Hz",
"739.1 Hz",
"750.3 Hz",
"761.3 Hz",
"772.4 Hz",
"783.4 Hz",
"795.2 Hz",
"806.9 Hz",
"818.7 Hz",
"830.6 Hz",];

const fx1 = ["- inf.",
"-91.5dB",
"-87.1dB",
"-82.6dB",
"-78.0dB",
"-73.5dB",
"-69.0dB",
"-64.5dB",
"-59.9dB",
"-55.4dB",
"-51.0dB",
"-46.5dB",
"-41.9dB",
"-37.4dB",
"-32.9dB",
"-28.4dB",
"-24.5dB",
"-24.1dB",
"-23.7dB",
"-23.3dB",
"-23.0dB",
"-22.6dB",
"-22.2dB",
"-21.8dB",
"-21.4dB",
"-21.1dB",
"-20.7dB",
"-20.3dB",
"-19.9dB",
"-19.5dB",
"-19.2dB",
"-18.8dB",
"-18.5dB",
"-18.2dB",
"-18.0dB",
"-17.8dB",
"-17.6dB",
"-17.4dB",
"-17.1dB",
"-16.9dB",
"-16.7dB",
"-16.5dB",
"-16.2dB",
"-16.0dB",
"-15.8dB",
"-15.6dB",
"-15.4dB",
"-15.1dB",
"-14.9dB",
"-14.8dB",
"-14.6dB",
"-14.5dB",
"-14.3dB",
"-14.1dB",
"-14.0dB",
"-13.8dB",
"-13.7dB",
"-13.5dB",
"-13.4dB",
"-13.2dB",
"-13.1dB",
"-12.9dB",
"-12.7dB",
"-12.6dB",
"-12.4dB",
"-12.3dB",
"-12.2dB",
"-12.1dB",
"-12.0dB",
"-11.8dB",
"-11.7dB",
"-11.6dB",
"-11.5dB",
"-11.4dB",
"-11.2dB",
"-11.1dB",
"-11.0dB",
"-10.9dB",
"-10.7dB",
"-10.6dB",
"-10.5dB",
"-10.4dB",
"-10.3dB",
"-10.2dB",
"-10.1dB",
"-10.0dB",
"-9.9dB",
"-9.8dB",
"-9.7dB",
"-9.6dB",
"-9.5dB",
"-9.4dB",
"-9.3dB",
"-9.2dB",
"-9.1dB",
"-9.0dB",
"-8.9dB",
"-8.8dB",
"-8.8dB",
"-8.7dB",
"-8.6dB",
"-8.5dB",
"-8.4dB",
"-8.3dB",
"-8.3dB",
"-8.2dB",
"-8.1dB",
"-8.0dB",
"-7.9dB",
"-7.8dB",
"-7.8dB",
"-7.7dB",
"-7.6dB",
"-7.5dB",
"-7.4dB",
"-7.4dB",
"-7.3dB",
"-7.2dB",
"-7.2dB",
"-7.1dB",
"-7.0dB",
"-6.9dB",
"-6.9dB",
"-6.8dB",
"-6.7dB",
"-6.7dB",
"-6.6dB",
"-6.5dB",
"-6.4dB",
"-6.4dB",
"-6.3dB",
"-6.2dB",
"-6.2dB",
"-6.1dB",
"-6.1dB",
"-6.0dB",
"-5.9dB",
"-5.9dB",
"-5.8dB",
"-5.7dB",
"-5.7dB",
"-5.6dB",
"-5.5dB",
"-5.5dB",
"-5.4dB",
"-5.4dB",
"-5.3dB",
"-5.2dB",
"-5.2dB",
"-5.1dB",
"-5.1dB",
"-5.0dB",
"-5.0dB",
"-4.9dB",
"-4.8dB",
"-4.8dB",
"-4.7dB",
"-4.7dB",
"-4.6dB",
"-4.6dB",
"-4.5dB",
"-4.4dB",
"-4.4dB",
"-4.3dB",
"-4.3dB",
"-4.2dB",
"-4.2dB",
"-4.1dB",
"-4.1dB",
"-4.0dB",
"-4.0dB",
"-3.9dB",
"-3.9dB",
"-3.8dB",
"-3.8dB",
"-3.7dB",
"-3.7dB",
"-3.6dB",
"-3.6dB",
"-3.5dB",
"-3.5dB",
"-3.4dB",
"-3.4dB",
"-3.3dB",
"-3.3dB",
"-3.2dB",
"-3.2dB",
"-3.2dB",
"-3.1dB",
"-3.1dB",
"-3.0dB",
"-3.0dB",
"-2.9dB",
"-2.9dB",
"-2.8dB",
"-2.8dB",
"-2.7dB",
"-2.7dB",
"-2.6dB",
"-2.6dB",
"-2.5dB",
"-2.5dB",
"-2.4dB",
"-2.4dB",
"-2.3dB",
"-2.3dB",
"-2.2dB",
"-2.2dB",
"-2.2dB",
"-2.1dB",
"-2.1dB",
"-2.0dB",
"-2.0dB",
"-1.9dB",
"-1.9dB",
"-1.8dB",
"-1.8dB",
"-1.7dB",
"-1.7dB",
"-1.6dB",
"-1.6dB",
"-1.5dB",
"-1.5dB",
"-1.5dB",
"-1.4dB",
"-1.4dB",
"-1.3dB",
"-1.3dB",
"-1.2dB",
"-1.2dB",
"-1.1dB",
"-1.1dB",
"-1.0dB",
"-1.0dB",
"-0.9dB",
"-0.9dB",
"-0.8dB",
"-0.8dB",
"-0.7dB",
"-0.7dB",
"-0.6dB",
"-0.6dB",
"-0.6dB",
"-0.5dB",
"-0.5dB",
"-0.4dB",
"-0.4dB",
"-0.3dB",
"-0.3dB",
"-0.2dB",
"-0.2dB",
"-0.1dB",
"-0.1dB",
"-0.0dB",
"0.0dB",
"0.1dB",
"+0.1dB",
"+0.2dB",
"+0.2dB",
"+0.2dB",
"+0.3dB",
"+0.3dB",
"+0.4dB",
"+0.4dB",
"+0.5dB",
"+0.5dB",
"+0.6dB",
"+0.6dB",
"+0.7dB",
"+0.7dB",
"+0.8dB",
"+0.8dB",
"+0.9dB",
"+0.9dB",
"+1.0dB",
"+1.0dB",
"+1.1dB",
"+1.1dB",
"+1.1dB",
"+1.2dB",
"+1.2dB",
"+1.3dB",
"+1.3dB",
"+1.4dB",
"+1.4dB",
"+1.5dB",
"+1.5dB",
"+1.6dB",
"+1.6dB",
"+1.7dB",
"+1.7dB",
"+1.8dB",
"+1.8dB",
"+1.9dB",
"+1.9dB",
"+2.0dB",
"+2.0dB",
"+2.0dB",
"+2.1dB",
"+2.2dB",
"+2.2dB",
"+2.2dB",
"+2.3dB",
"+2.3dB",
"+2.4dB",
"+2.4dB",
"+2.5dB",
"+2.5dB",
"+2.6dB",
"+2.6dB",
"+2.7dB",
"+2.7dB",
"+2.8dB",
"+2.8dB",
"+2.9dB",
"+2.9dB",
"+3.0dB",
"+3.0dB",
"+3.0dB",
"+3.1dB",
"+3.1dB",
"+3.2dB",
"+3.2dB",
"+3.3dB",
"+3.3dB",
"+3.4dB",
"+3.4dB",
"+3.5dB",
"+3.5dB",
"+3.6dB",
"+3.6dB",
"+3.7dB",
"+3.7dB",
"+3.8dB",
"+3.8dB",
"+3.8dB",
"+3.9dB",
"+4.0dB",
"+4.0dB",
"+4.0dB",
"+4.1dB",
"+4.1dB",
"+4.2dB",
"+4.2dB",
"+4.3dB",
"+4.3dB",
"+4.4dB",
"+4.4dB",
"+4.5dB",
"+4.5dB",
"+4.6dB",
"+4.6dB",
"+4.7dB",
"+4.7dB",
"+4.8dB",
"+4.8dB",
"+4.8dB",
"+4.9dB",
"+4.9dB",
"+5.0dB",
"+5.0dB",
"+5.1dB",
"+5.1dB",
"+5.2dB",
"+5.2dB",
"+5.3dB",
"+5.3dB",
"+5.4dB",
"+5.4dB",
"+5.5dB",
"+5.5dB",
"+5.6dB",
"+5.6dB",
"+5.7dB",
"+5.7dB",
"+5.8dB",
"+5.8dB",
"+5.8dB",
"+5.9dB",
"+5.9dB",
"+6.0dB",
"+6.0dB",
"+6.1dB",
"+6.1dB",
"+6.2dB",
"+6.2dB",
"+6.3dB",
"+6.3dB",
"+6.4dB",
"+6.4dB",
"+6.5dB",
"+6.5dB",
"+6.6dB",
"+6.6dB",
"+6.7dB",
"+6.7dB",
"+6.7dB",
"+6.8dB",
"+6.8dB",
"+6.9dB",
"+6.9dB",
"+7.0dB",
"+7.0dB",
"+7.1dB",
"+7.1dB",
"+7.2dB",
"+7.2dB",
"+7.3dB",
"+7.3dB",
"+7.4dB",
"+7.4dB",
"+7.4dB",
"+7.5dB",
"+7.5dB",
"+7.6dB",
"+7.6dB",
"+7.7dB",
"+7.7dB",
"+7.8dB",
"+7.8dB",
"+7.9dB",
"+7.9dB",
"+8.0dB",
"+8.0dB",
"+8.1dB",
"+8.1dB",
"+8.2dB",
"+8.2dB",
"+8.2dB",
"+8.3dB",
"+8.4dB",
"+8.4dB",
"+8.4dB",
"+8.5dB",
"+8.5dB",
"+8.6dB",
"+8.6dB",
"+8.7dB",
"+8.7dB",
"+8.8dB",
"+8.8dB",
"+8.9dB",
"+8.9dB",
"+9.0dB",
"+9.0dB",
"+9.1dB",
"+9.1dB",
"+9.1dB",
"+9.2dB",
"+9.2dB",
"+9.3dB",
"+9.3dB",
"+9.4dB",
"+9.4dB",
"+9.5dB",
"+9.5dB",
"+9.6dB",
"+9.6dB",
"+9.7dB",
"+9.7dB",
"+9.8dB",
"+9.8dB",
"+9.9dB",
"+9.9dB",
"+10.0dB",
"+10.0dB",
"+10.1dB",
"+10.1dB",
"+10.1dB",
"+10.2dB",
"+10.2dB",
"+10.3dB",
"+10.3dB",
"+10.4dB",
"+10.4dB",
"+10.5dB",
"+10.5dB",
"+10.6dB",
"+10.6dB",
"+10.7dB",
"+10.7dB",
"+10.8dB",
"+10.8dB",
"+10.9dB",
"+10.9dB",
"+10.9dB",
"+11.0dB",
"+11.1dB",
"+11.1dB",
"+11.1dB",
"+11.2dB",
"+11.2dB",
"+11.3dB",
"+11.3dB",
"+11.4dB",
"+11.4dB",
"+11.5dB",
"+11.5dB",
"+11.6dB",
"+11.6dB",
"+11.7dB",
"+11.7dB",
"+11.8dB",
"+11.8dB",
"+11.9dB",
"+11.9dB",
"+11.9dB",
"+12.0dB",
"+12.0dB"];

const fx68 = ["830.6 Hz",
"842.9 Hz",
"855.4 Hz",
"867.8 Hz",
"880.4 Hz",
"893.4 Hz",
"906.7 Hz",
"919.8 Hz",
"933.1 Hz",
"947.0 Hz",
"961.1 Hz",
"975.0 Hz",
"989.1 Hz",
"1003.8 Hz",
"1018.7 Hz",
"1033.4 Hz",
"1048.4 Hz",
"1063.9 Hz",
"1079.7 Hz",
"1095.3 Hz",
"1111.2 Hz",
"1127.7 Hz",
"1144.5 Hz",
"1161.0 Hz",
"1177.9 Hz",
"1195.4 Hz",
"1213.1 Hz",
"1230.5 Hz",
"1248.5 Hz",
"1267.0 Hz",
"1285.8 Hz",
"1304.3 Hz",
"1323.4 Hz",
"1343.0 Hz",
"1362.9 Hz",
"1382.5 Hz",
"1402.7 Hz",
"1423.5 Hz",
"1444.6 Hz",
"1465.3 Hz",
"1486.8 Hz",
"1508.8 Hz",
"1531.2 Hz",
"1553.2 Hz",
"1576.0 Hz",
"1599.3 Hz",
"1622.9 Hz",
"1646.2 Hz",
"1670.4 Hz",
"1695.1 Hz",
"1720.2 Hz",
"1744.9 Hz",
"1770.6 Hz",
"1796.8 Hz",
"1823.3 Hz",
"1849.5 Hz",
"1876.8 Hz",
"1904.5 Hz",
"1932.6 Hz",
"1960.3 Hz",
"1989.2 Hz",
"2018.6 Hz",
"2048.4 Hz",
"2077.8 Hz",
"2108.5 Hz",
"2139.6 Hz",
"2171.2 Hz",
"2202.4 Hz",
"2235.0 Hz",
"2267.9 Hz",
"2301.4 Hz",
"2334.3 Hz",
"2368.9 Hz",
"2403.8 Hz",
"2439.3 Hz",
"2474.2 Hz",
"2510.9 Hz",
"2547.9 Hz",
"2585.5 Hz",
"2622.5 Hz",
"2661.5 Hz",
"2700.7 Hz",
"2740.5 Hz",
"2779.7 Hz",
"2821.0 Hz",
"2862.6 Hz",
"2904.8 Hz",
"2946.3 Hz",
"2990.2 Hz",
"3034.2 Hz",
"3078.9 Hz",
"3122.9 Hz",
"3169.4 Hz",
"3216.0 Hz",
"3263.4 Hz",
"3310.0 Hz",
"3359.4 Hz",
"3408.8 Hz",
"3459.0 Hz",
"3508.4 Hz",
"3560.8 Hz",
"3613.2 Hz",
"3666.3 Hz",
"3718.6 Hz",
"3774.3 Hz",
"3829.7 Hz",
"3886.0 Hz",
"3941.4 Hz",
"4000.5 Hz",
"4059.3 Hz",
"4118.9 Hz",
"4177.7 Hz",
"4240.4 Hz",
"4302.6 Hz",
"4365.8 Hz",
"4428.0 Hz",
"4494.6 Hz",
"4560.5 Hz",
"4627.5 Hz",
"4693.4 Hz",
"4764.0 Hz",
"4833.9 Hz",
"4904.8 Hz",
"4974.7 Hz",
"5049.6 Hz",
"5123.6 Hz",
"5198.8 Hz",
"5272.8 Hz",
"5352.4 Hz",
"5432.0 Hz",
"5510.5 Hz",
"5590.2 Hz",
"5673.3 Hz",
"5757.6 Hz",
"5840.7 Hz",
"5925.4 Hz",
"6013.4 Hz",
"6102.7 Hz",
"6190.7 Hz",
"6280.6 Hz",
"6373.8 Hz",
"6468.5 Hz",
"6561.8 Hz",
"6657.2 Hz",
"6756.0 Hz",
"6856.3 Hz",
"6955.1 Hz",
"7056.3 Hz",
"7161.0 Hz",
"7267.2 Hz",
"7371.9 Hz",
"7479.3 Hz",
"7590.2 Hz",
"7702.8 Hz",
"7813.7 Hz",
"7927.7 Hz",
"8045.2 Hz",
"8164.5 Hz",
"8282.0 Hz",
"8403.1 Hz",
"8527.5 Hz",
"8653.9 Hz",
"8778.4 Hz",
"8906.8 Hz",
"9038.7 Hz",
"9172.7 Hz",
"9304.5 Hz",
"9440.9 Hz",
"9580.6 Hz",
"9722.5 Hz",
"9862.2 Hz",
"10006.9 Hz",
"10154.9 Hz",
"10305.2 Hz",
"10453.2 Hz",
"10606.9 Hz",
"10763.7 Hz",
"10922.9 Hz",
"11079.7 Hz",
"11242.7 Hz",
"11408.9 Hz",
"11577.6 Hz",
"11743.7 Hz",
"11916.8 Hz",
"12092.8 Hz",
"12271.6 Hz",
"12447.6 Hz",
"12631.3 Hz",
"12817.7 Hz",
"13007.1 Hz",
"13193.6 Hz",
"13388.5 Hz",
"13586.1 Hz",
"13786.7 Hz",
"13984.3 Hz",
"14191.1 Hz",
"14400.4 Hz",
"14613.0 Hz",
"14822.3 Hz",
"15041.9 Hz",
"15263.7 Hz",
"15488.9 Hz",
"15710.7 Hz",
"15943.7 Hz",
"16178.7 Hz",
"16417.3 Hz",
"16652.2 Hz",
"16899.5 Hz",
"17148.5 Hz",
"17401.3 Hz",
"17650.2 Hz",
"17912.7 Hz",
"18176.4 Hz",
"18444.2 Hz",
"18707.9 Hz",
"18986.5 Hz",
"19265.9 Hz",
"19549.7 Hz",
"19829.1 Hz",
"20124.8 Hz",
"20420.8 Hz",
"20721.5 Hz",
"21017.5 Hz",
"21331.4 Hz",
"21645.0 Hz",
"21963.5 Hz",
"22277.1 Hz",
"22610.1 Hz",
"22942.4 Hz",
"23279.8 Hz",
"23612.1 Hz",
"23965.6 Hz",
"24317.6 Hz",
"24675.1 Hz",
"25027.1 Hz",
"25402.3 Hz",
"25775.3 Hz",
"26154.1 Hz",
"26527.0 Hz",
"26925.2 Hz",
"27320.3 Hz",
"27721.6 Hz",
"28116.7 Hz",
"28539.3 Hz",
"28958.0 Hz",
"29383.1 Hz",
"29801.7 Hz",
"30250.2 Hz",
"30693.7 Hz",
"31144.2 Hz",
"31587.7 Hz",
"32063.7 Hz",
"32533.6 Hz",
"33010.8 Hz",
"Off"]

let arrayOfFxObj: Array<Object> = [];

const fxKeyNames = ["step","min","max","label","textRepl","nameOfFx","nameOfFxId","multiReqPos","singleReqPos","adressPage","addValue"];


export const defFxObj = {
    [fxKeyNames[0]] : ["0"],     //step
    [fxKeyNames[1]]: ["0"],      //min
    [fxKeyNames[2]]: ["0"],      //max 
    [fxKeyNames[3]]: [""],       //label
    [fxKeyNames[4]]: [[""]],     //textRepl  
    [fxKeyNames[5]]: "",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [0],        //multiReqPos
    [fxKeyNames[8]]: [0],        //singleReqPos 
    [fxKeyNames[9]]: [0],         //adressPage
    [fxKeyNames[10]]: [""]         //addValue
} 


//rig settings adr. page 0x4
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["1"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["508"],    //max 
    [fxKeyNames[3]]: ["knobRigvol"],    //label
    [fxKeyNames[4]]: [fx1],    //textRepl  
    [fxKeyNames[5]]: "Rig",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [10],       //multiReqPos
    [fxKeyNames[8]]: [1],       //singleReqPos 
    [fxKeyNames[9]]: [4],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
    }
);

//input adr. page 0x9
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["0"],    //max 
    [fxKeyNames[3]]: [""],    //label
    [fxKeyNames[4]]: [[""]],    //textRepl  
    [fxKeyNames[5]]: "Input",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [0],       //multiReqPos
    [fxKeyNames[8]]: [0],       //singleReqPos 
    [fxKeyNames[9]]: [0],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
    }
);

//obj for the allways visible gain, except on smalles screens, handling of dom selection is different
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["10"],    //max 
    [fxKeyNames[3]]: ["knobGain"],    //label
    [fxKeyNames[4]]: [[""]],    //textRepl  
    [fxKeyNames[5]]: "Amplifier",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [18],       //multiReqPos
    [fxKeyNames[8]]: [4],       //singleReqPos 
    [fxKeyNames[9]]: [10],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
    }
);

//obj for the allways visible gain, except on smalles screens, handling of dom selection is different
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],    //step
    [fxKeyNames[1]]: ["-5","-5","-5","-5"],     //min
    [fxKeyNames[2]]: ["5","5","5","5","5"],    //max 
    [fxKeyNames[3]]: ["knobBass","knobMids","knobTrebble","knobPresence"],    //label
    [fxKeyNames[4]]: [[""],[""],[""],[""]],    //textRepl  
    [fxKeyNames[5]]: "Equalizer",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [18,20,22,24],       //multiReqPos
    [fxKeyNames[8]]: [4,5,6,7],       //singleReqPos 
    [fxKeyNames[9]]: [11,11,11,11],        //adressPage
    [fxKeyNames[10]]: ["","","",""]         //addValue
    }
);

//Cabinet adr. page 0x0C
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["0"],    //max 
    [fxKeyNames[3]]: [""],    //label
    [fxKeyNames[4]]: [[""]],    //textRepl  
    [fxKeyNames[5]]: "Cabinet",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [0],       //multiReqPos
    [fxKeyNames[8]]: [0],       //singleReqPos 
    [fxKeyNames[9]]: [0],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
    }
);

//User scales adr. page 0x76
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["0"],    //max 
    [fxKeyNames[3]]: [""],    //label
    [fxKeyNames[4]]: [[""]],    //textRepl  
    [fxKeyNames[5]]: "Userscales",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [0],       //multiReqPos
    [fxKeyNames[8]]: [0],       //singleReqPos 
    [fxKeyNames[9]]: [0],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
    }
);

//Clooper and fx module freeze adr. page 0x7D
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["0"],    //max 
    [fxKeyNames[3]]: [""],    //label
    [fxKeyNames[4]]: [[""]],    //textRepl  
    [fxKeyNames[5]]: "LooperAndFxFreeze",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [0],       //multiReqPos
    [fxKeyNames[8]]: [0],       //singleReqPos 
    [fxKeyNames[9]]: [0],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
    }
);

//System global adr. page 0x7F
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["0"],    //max 
    [fxKeyNames[3]]: [""],    //label
    [fxKeyNames[4]]: [[""]],    //textRepl  
    [fxKeyNames[5]]: "Global",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [0],       //multiReqPos
    [fxKeyNames[8]]: [0],       //singleReqPos 
    [fxKeyNames[9]]: [0],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
    }
);

//let fx2 = {
//    "step": ["0.1"],
//    "min": ["0"],
//    "max": ["10"],
//    "label": ["Threshold"],
//    "textRepl": [[""]],
//    "nameOfFx": "Noise Gate 2:1",
//    "nameOfFxId": ["0","37"],
//    "multiReqPos": [46]
// }


//off fx
arrayOfFxObj.push(  defFxObj );

//amplifier section controls
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1"],    //step
    [fxKeyNames[1]]: ["-12","0","0","0","0","-5","0","0","0","0"],     //min
    [fxKeyNames[2]]: ["12","10","10","10","10","5","10","10","10","10"],    //max 
    [fxKeyNames[3]]: ["Volume","Gain","Definition","Clarity","Power Sagging","Pick","Compressor","Tube Shape","Tube Bias","Direct Mix"],    //label
    [fxKeyNames[4]]: [[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],    //textRepl  
    [fxKeyNames[5]]: "Amplifier",    //nameOfFx
    [fxKeyNames[6]]: [10,1],       //fake it to 10,1,to avoid collision with 0,1
    [fxKeyNames[7]]: [16,18,22,24,26,28,30,32,34,40],       //multiReqPos
    [fxKeyNames[8]]: [3,4,6,7,8,9,10,11,12,15],       //singleReqPos 
    [fxKeyNames[9]]: [10],        //adressPage
    [fxKeyNames[10]]: ["","","","","","","","","",""]         //addValue
    }
);


//off fx dummy
arrayOfFxObj.push({
    [fxKeyNames[0]]: [""],
    [fxKeyNames[1]]: [""],
    [fxKeyNames[2]]: [""],
    [fxKeyNames[3]]: [""],
    [fxKeyNames[4]]: [[""]],
    [fxKeyNames[5]]: "",
    [fxKeyNames[6]]: [0,0],
    [fxKeyNames[7]]: [16],
    [fxKeyNames[8]]: [3],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: [""]         //addValue
    }
);


//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah Wah",
    [fxKeyNames[6]]: [0,1],
    [fxKeyNames[7]]: [26,28,30,114, 34 ,18,  116,  22],
    [fxKeyNames[8]]: [8,9,10,52,12,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","%","",""]         //addValue
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah Low Pass",
    [fxKeyNames[6]]: [0,2],
    [fxKeyNames[7]]: [26,28,30,114, 34 ,18,  116,  22],
    [fxKeyNames[8]]: [8,9,10,52,12,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","%","",""]        
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah High Pass",
    [fxKeyNames[6]]: [0,3],
    [fxKeyNames[7]]: [26,28,30,114, 34 ,18,  116,  22],
    [fxKeyNames[8]]: [8,9,10,52,12,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","%","",""]        
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah Vowel Filter",
    [fxKeyNames[6]]: [0,4],
    [fxKeyNames[7]]: [26,28,30,114, 34 ,18,  116,  22],
    [fxKeyNames[8]]: [8,9,10,52,12,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","%","",""]        
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","0.1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","-5","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","5","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Spread","Stages", "Mix", "Ducking", "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],["2","4","6","8","10","12"],
                    [""],[""],[""]],
    [fxKeyNames[5]]: "Wah Phaser",
    [fxKeyNames[6]]: [0,6],
    [fxKeyNames[7]]: [26,28,30,114,34 ,62,  64,  18,116,11],
    [fxKeyNames[8]]: [8,9,10,52,12,26,27,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","","","%","",""]   
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking", "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah Flanger",
    [fxKeyNames[6]]: [0,7],
    [fxKeyNames[7]]: [26,28,30,114, 34 ,18,  116, 22],
    [fxKeyNames[8]]: [8,9,10,52,12,4,53, 6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","%","",""]   
    }
);



//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""], [""], [""] ],
    [fxKeyNames[5]]: "Wah Rate Reducer",
    [fxKeyNames[6]]: [0,8],
    [fxKeyNames[7]]: [26,28,30,114,  34,18,116, 22],
    //36  ,38 ,40 
    [fxKeyNames[8]]: [8,9,10,52,12,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","%","","","","",""]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["-5","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["5","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Pedal Range","Pedal Mode", "Mix", "Ducking", "Volume"],
    [fxKeyNames[4]]: [[""],[""],["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""] ],
    [fxKeyNames[5]]: "Wah Ring Modulator",
    [fxKeyNames[6]]: [0,9],
    [fxKeyNames[7]]: [26,30,34,18,116,  22],
    [fxKeyNames[8]]: [8,10,12,4,53, 6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","%","","%","","","","",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","1","1","1","1","0.1","0.1", "0.1"],
    [fxKeyNames[1]]: ["-5","-100","0","0","-5","0","0","0","-5"],
    [fxKeyNames[2]]: ["5","100","5","100","5","10","10","10", "5"],
    [fxKeyNames[3]]: ["Manual","Pedal Range","Pedal Mode", "Mix","Ducking", "Touch Attack","Touch Release","Touch Boost", "Volume"],
    [fxKeyNames[4]]: [[""],[""],["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""],[""] ,[""] ,[""]   ],
    [fxKeyNames[5]]: "Wah Freq Shifter",
    [fxKeyNames[6]]: [0,10],
    [fxKeyNames[7]]: [26,30,34,18,  116, 36,38,40, 22],
    [fxKeyNames[8]]: [8,10,12,4,53,13,14,15,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","%","","%","","","","",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","1","1","1", "1","1","0.1"],
    [fxKeyNames[1]]: ["-5","-100","28","0","-5","-5"],
    [fxKeyNames[2]]: ["5","100","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Pedal Range","Pitch Shift","Pedal Mode", "Mix","Ducking", "Volume"],
    [fxKeyNames[4]]: [[""],[""],
    ["","","","","","","","","","","","","","","","","","","","","","","","","","","","", 
    "-36","-35","-34","-33","-32","-31","-30","-29","-28","-27","-26","-25","-24","-23","-22","-21","-20","-19",
    "-18","-17","-16","-15","-14","-13","-12","-11","-10","-9","-8","-7","-6","-5","-4","-3","-2","-1","0",
    "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19",
    "20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"],
    ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"], [""],[""],[""]  ],
    [fxKeyNames[5]]: "Wah Formant Shift",
    [fxKeyNames[6]]: [0,12],
    [fxKeyNames[7]]: [26,30,124,34, 18,  116,  22],
    [fxKeyNames[8]]: [8,10,57,12,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","%","","","%","",""]  
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1","0.1","1"],
    [fxKeyNames[1]]: ["0","0","-5","0","0","0"],
    [fxKeyNames[2]]: ["10","10","5","10","10","100"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume","Definition","Slim Down","Mix"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],[""],[""]  ],
    [fxKeyNames[5]]: "Kemper Drive",
    [fxKeyNames[6]]: [0,32],
    [fxKeyNames[7]]: [26,28,22,36,40,18 ],
    [fxKeyNames[8]]: [16,17,6,21,23,4],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","","","","%"]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","0",],
    [fxKeyNames[2]]: ["10","10","5","100"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume","Mix"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Green Scream",
    [fxKeyNames[6]]: [0,33],
    [fxKeyNames[7]]: [26,28,22,114],
    [fxKeyNames[8]]: [16,17,6,4],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","","%"]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5",],
    [fxKeyNames[2]]: ["10","100","5"],
    [fxKeyNames[3]]: ["Drive","Mix","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""]],
    [fxKeyNames[5]]: "Plus DS",
    [fxKeyNames[6]]: [0,34],
    [fxKeyNames[7]]: [24,34,22],
    [fxKeyNames[8]]: [16,4,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","%",""]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","0"],
    [fxKeyNames[2]]: ["10","10","5","100"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume","Mix"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "One DS",
    [fxKeyNames[6]]: [0,35],
    [fxKeyNames[7]]: [26,28,22,114],
    [fxKeyNames[8]]: [16,17,6,4],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","","%"]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","0"],
    [fxKeyNames[2]]: ["10","10","5","100"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume","Mix"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Muffin",
    [fxKeyNames[6]]: [0,36],
    [fxKeyNames[7]]: [26,28,22,114],
    [fxKeyNames[8]]: [16,17,6,4],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","","%"]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","0"],
    [fxKeyNames[2]]: ["10","10","5","100"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume","Mix"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Mouse",
    [fxKeyNames[6]]: [0,37],
    [fxKeyNames[7]]: [26,28,22,114],
    [fxKeyNames[8]]: [16,17,6,4],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","","%"]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","0"],
    [fxKeyNames[2]]: ["10","10","5","100"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume","Mix"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Full OC",
    [fxKeyNames[6]]: [0,42],
    [fxKeyNames[7]]: [26,28,22,114],
    [fxKeyNames[8]]: [16,17,6,4],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","","%"]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","-5","0","0","0","0","0","0"],
    [fxKeyNames[2]]: ["10","5","10","10","10","10","10", "100"],
    [fxKeyNames[3]]: ["Drive","Volume","Transistor Shape","Transistor Tone","Impedance LP","Definition","Octa",  "Mix"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],[""],[""],[""], [""]],
    [fxKeyNames[5]]: "Kemper Fuzz",
    [fxKeyNames[6]]: [0,38],
    [fxKeyNames[7]]: [26,22,50,52,208,56,46,114],
    [fxKeyNames[8]]: [16,6,20,21,19,23,18,4],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","","","","","","%"]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","-18","-18","20.6","-18"],
    [fxKeyNames[2]]: ["10","100","5","18","18","33488.1","18"],
    [fxKeyNames[3]]: ["Drive","Mix","Volume","Low","Middle","Mid Freq","High"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Metal DS",
    [fxKeyNames[6]]: [0,39],
    [fxKeyNames[7]]: [26,114,22,90,98,100,94 ],
    [fxKeyNames[8]]: [16,4,6,42,46,47,44],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","%",""," dB"," dB", " Hz", " dB"]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","100","5", "5"],
    [fxKeyNames[3]]: ["Tone","Mix","Ducking","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Treble Booster",
    [fxKeyNames[6]]: [0,113],
    [fxKeyNames[7]]: [42,114,112,22 ],
    [fxKeyNames[8]]: [17,4,53,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","%","",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","100","5", "5"],
    [fxKeyNames[3]]: ["Tone","Mix","Ducking","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Lead Booster",
    [fxKeyNames[6]]: [0,114],
    [fxKeyNames[7]]: [42,114,112,22 ],
    [fxKeyNames[8]]: [17,4,53,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","%","",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1"],
    [fxKeyNames[1]]: ["-5"],
    [fxKeyNames[2]]: ["5"],
    [fxKeyNames[3]]: ["Volume"],
    [fxKeyNames[4]]: [[""]],
    [fxKeyNames[5]]: "Pure Booster",
    [fxKeyNames[6]]: [0,115],
    [fxKeyNames[7]]: [22 ],
    [fxKeyNames[8]]: [6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: [""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["1","0.1"],
    [fxKeyNames[1]]: ["-100","-5"],
    [fxKeyNames[2]]: ["100","5"],
    [fxKeyNames[3]]: ["Pedal Range","Volume"],
    [fxKeyNames[4]]: [[""],[""]],
    [fxKeyNames[5]]: "Wah Pedal Booster",
    [fxKeyNames[6]]: [0,116],
    [fxKeyNames[7]]: [30,22 ],
    [fxKeyNames[8]]: [10,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["%",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5"],
    [fxKeyNames[2]]: ["10","10","5"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""]],
    [fxKeyNames[5]]: "Bit Shaper",
    [fxKeyNames[6]]: [0,17],
    [fxKeyNames[7]]: [42,44,22],
    [fxKeyNames[8]]: [16,17,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","5","5"],
    [fxKeyNames[3]]: ["Drive","Soft","Ducking","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Octa Shaper",
    [fxKeyNames[6]]: [0,18],
    [fxKeyNames[7]]: [42,46,112,22],
    [fxKeyNames[8]]: [16,18,53,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1"],
    [fxKeyNames[1]]: ["0","-5"],
    [fxKeyNames[2]]: ["10","5"],
    [fxKeyNames[3]]: ["Drive","Volume"],
    [fxKeyNames[4]]: [[""],[""]],
    [fxKeyNames[5]]: "Soft Shaper",
    [fxKeyNames[6]]: [0,19],
    [fxKeyNames[7]]: [26,22],
    [fxKeyNames[8]]: [16,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1"],
    [fxKeyNames[1]]: ["0","-5"],
    [fxKeyNames[2]]: ["10","5"],
    [fxKeyNames[3]]: ["Drive","Volume"],
    [fxKeyNames[4]]: [[""],[""]],
    [fxKeyNames[5]]: "Hard Shaper",
    [fxKeyNames[6]]: [0,20],
    [fxKeyNames[7]]: [26,22],
    [fxKeyNames[8]]: [16,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["",""]   
    }
);




arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1"],
    [fxKeyNames[1]]: ["0","-5"],
    [fxKeyNames[2]]: ["10","5"],
    [fxKeyNames[3]]: ["Drive","Volume"],
    [fxKeyNames[4]]: [[""],[""]],
    [fxKeyNames[5]]: "Wave Shaper",
    [fxKeyNames[6]]: [0,21],
    [fxKeyNames[7]]: [26,22],
    [fxKeyNames[8]]: [16,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["",""]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1","1","1", "0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["-12","-12","-12","-12","0","0",  "-5","0","-5"],
    [fxKeyNames[2]]: ["12","12","12","12","254","254",   "5","100","5"],
    [fxKeyNames[3]]: ["1250 Hz","2500 Hz","5000 Hz","10 000 Hz","Low Cut","High Cut","Volume","Mix","Ducking"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],fx67,fx68,[""],[""],[""]],
    [fxKeyNames[5]]: "Graphic Equalizer",
    [fxKeyNames[6]]: [0,97],
    [fxKeyNames[7]]: [86,88,90,92,140,142,22,114,112],
    [fxKeyNames[8]]: [38,39,40,41,67,68,6,4,53],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: [" dB"," dB"," dB", " dB", "", "","","",""]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","1","0.1","1","0.1","1","0.05","0.1","1","0.05","1","1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["-18","0","-18","0","-18","0","0.1","-18","0","0.1","0","0","-5","0","-5"],
    [fxKeyNames[2]]: ["18","254","18","254","18","254","5","18","254","5","254","254","5","100","5"],
    [fxKeyNames[3]]: ["Low Gain","Low Freq","High Gain","High Freq","Mid1 Gain","Mid1 Freq","Mid1 Q-Fact","Mid2 Gain","Mid2 Freq","Mid2 Q-Fact","Low Cut","High Cut","Volume","Mix","Ducking"],
    [fxKeyNames[4]]: [[""],fx50,[""],fx50,[""],fx50,[""],[""],fx50,[""],fx67,fx68,[""],[""],[""]],
    [fxKeyNames[5]]: "Studio Equalizer",
    [fxKeyNames[6]]: [0,98],
    [fxKeyNames[7]]: [94,96,98,100,102,104,106,108,110,112,144,146,22,114,112],
    [fxKeyNames[8]]: [42,43,44,45,46,47,48,49,50,51,67,68,6,4,53],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: [" dB",""," dB",""," dB","",""," dB"," Hz", "","","","","",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1","1","1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["-18","-18","20.6","-18","0","0","-5","0","-5"],
    [fxKeyNames[2]]: ["18","18","33480.1","18","154","254","5","100","5"],
    [fxKeyNames[3]]: ["Low","Middle","Mid Frequency","High","Low Cut","High Cut","Volume","Mix","Ducking"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],fx67,fx68,[""],[""],[""]],
    [fxKeyNames[5]]: "Metal Equalizer",
    [fxKeyNames[6]]: [0,99],
    [fxKeyNames[7]]: [94,102,104,98,144,146,22,114,112],
    [fxKeyNames[8]]: [42,46,47,44,67,68,6,4,53],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: [" dB"," db"," Hz", " dB","","",""," %",""]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0" ,"-5","-5","-5",  "0","-5"],
    [fxKeyNames[2]]: ["10","5","5","5", "100","5"],
    [fxKeyNames[3]]: ["Pickup","Body","Bronze","Sparkle","Mix","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Acoustic Simulator",
    [fxKeyNames[6]]: [0,100],
    [fxKeyNames[7]]: [108,94,102,98,114,22],
    [fxKeyNames[8]]: [49,42,46,44,4,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","",""," %",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0" ,"0","-5"],
    [fxKeyNames[2]]: ["10","10","5"],
    [fxKeyNames[3]]: ["Intensity","Tune","Ducking"],
    [fxKeyNames[4]]: [[""],[""],[""]],
    [fxKeyNames[5]]: "Stereo Widener",
    [fxKeyNames[6]]: [0,101],
    [fxKeyNames[7]]: [50,48,112],
    [fxKeyNames[8]]: [21,20,53],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","",""]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1"],
    [fxKeyNames[1]]: ["0"],
    [fxKeyNames[2]]: ["10"],
    [fxKeyNames[3]]: ["Intensity"],
    [fxKeyNames[4]]: [[""]],
    [fxKeyNames[5]]: "Phase Widener",
    [fxKeyNames[6]]: [0,102],
    [fxKeyNames[7]]: [50],
    [fxKeyNames[8]]: [21],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: [""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1"],
    [fxKeyNames[1]]: ["0"],
    [fxKeyNames[2]]: ["40"],
    [fxKeyNames[3]]: ["Intensity"],
    [fxKeyNames[4]]: [[""]],
    [fxKeyNames[5]]: "Delay Widener",
    [fxKeyNames[6]]: [0,103],
    [fxKeyNames[7]]: [50],
    [fxKeyNames[8]]: [21],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: [" ms"]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5"],
    [fxKeyNames[2]]: ["10","10","5"],
    [fxKeyNames[3]]: ["Looseness","Detune","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""]],
    [fxKeyNames[5]]: "Double Tracker",
    [fxKeyNames[6]]: [0,104],
    [fxKeyNames[7]]: [50,216,22],
    [fxKeyNames[8]]: [21,103,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: [""," cent",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","0","-5"],
    [fxKeyNames[2]]: ["10","10","5","100","5"],
    [fxKeyNames[3]]: ["Intensity","Attack","Squash","Mix","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Compressor",
    [fxKeyNames[6]]: [0,49],
    [fxKeyNames[7]]: [44,46,76,20,22],
    [fxKeyNames[8]]: [18,19,33,4,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","",""," %",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1"],
    [fxKeyNames[1]]: ["0","0"],
    [fxKeyNames[2]]: ["10","10"],
    [fxKeyNames[3]]: ["Swell","Compressor"],
    [fxKeyNames[4]]: [[""],[""]],
    [fxKeyNames[5]]: "Auto Swell",
    [fxKeyNames[6]]: [0,50],
    [fxKeyNames[7]]: [48,44],
    [fxKeyNames[8]]: [20,18],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1"],
    [fxKeyNames[1]]: ["0"],
    [fxKeyNames[2]]: ["10"],
    [fxKeyNames[3]]: ["Threshold"],
    [fxKeyNames[4]]: [[""]],
    [fxKeyNames[5]]: "Noise Gate 2:1",
    [fxKeyNames[6]]: [0,57],
    [fxKeyNames[7]]: [44],
    [fxKeyNames[8]]: [18],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: [""]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1"],
    [fxKeyNames[1]]: ["0"],
    [fxKeyNames[2]]: ["10"],
    [fxKeyNames[3]]: ["Threshold"],
    [fxKeyNames[4]]: [[""]],
    [fxKeyNames[5]]: "Noise Gate 4:1",
    [fxKeyNames[6]]: [0,58],
    [fxKeyNames[7]]: [44],
    [fxKeyNames[8]]: [18],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: [""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","254","100","5","5"],
    [fxKeyNames[3]]: ["Rate","Depth","Crossover","Mix","Ducking","Volume"],
    [fxKeyNames[4]]: [[""],[""],fx50,[""],[""],[""]],
    [fxKeyNames[5]]: "Vintage Chorus",
    [fxKeyNames[6]]: [0,65],
    [fxKeyNames[7]]: [48,50,54,20,112,22],
    [fxKeyNames[8]]: [20,21,23,4,53,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","",""," %","",""]   
    }
);

export {arrayOfFxObj};

//arrayOfFxMaps.push("fes",temp);





//export class FxObj {
//    name: string;

    //parameterNamesPerFx: ; 
//    fxParameterNames: FxParameterNames;
    //fxIds: typeof FxParameterIds[] = [];
//    fxIds: FxParameterIds;
//    fxDefintions: FxParameterDefinitions;
    //fxIds: number[] = [];
//    constructor (fxName: string) {
//        this.name = fxName;
        //let tempVal: number[] = [];
        //let fxPar = new FxParameterNames();
//        this.fxParameterNames = new FxParameterNames(fxName);
//        this.fxIds = new FxParameterIds(fxName)
//        this.fxDefintions = new FxParameterDefinitions(fxName);
//    }
//}