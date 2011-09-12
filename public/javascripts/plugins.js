/*
*
* Bastardized version of tweetable 1.6
* Basterdized by Ed van Beinum to show a list of tweets for a given hastag
*
* Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*
* With modifications from Philipp Robbel (http://www.robbel.com/) and Patrick DW (stackoverflow)
* for IE compatibility.
*
*
*/
(function ($) {
    //define the tweetable plugin
    $.fn.tweetable = function (options) {
        //specify the plugins defauls
        var defaults = {
            limit: 5, //number of tweets to show
            time: true, //display date
            hashtag: 'cheese',
            position: 'append'
        };
        //overwrite the defaults
        var options = $.extend(defaults, options);
        //loop through each instance
        return this.each(function (options) {
            //assign our initial vars
            var act = $(this);
            var $tweetList;

            var api = "http://search.twitter.com/search.json?q=%23" + defaults.hashtag;
            var count = "&count=";
            //do a JSON request to twitters API
            $.getJSON(api + count + defaults.limit + "&callback=?", act, function (data) {
            //loop through twitters response

                $.each(data.results, function (i, item) {
                    console.log(item);
                    //check for the first loop
                    if (i == 0) {
                     //create an unordered list to store tweets in
                        $tweetList = $('<ul class="tweetList">')[defaults.position.toLowerCase() + 'To'](act);
                    }

                    $tweetList.append('<li class="tweet_content_' + i + '"><img src="' + item.profile_image_url + '" /><p class="tweet_link_' + i + '">' + item.text + '</p></li>');
                    
                    //display the tiem of tweet if required
                    if (defaults.time == true) {                    
                        $('.tweet_link_' + i).append('<span> By: <a href="http://twitter.com/'+ item.from_user + '">' + item.from_user + '</a> ' + item.created_at + '</span>');
                    }
                });
                //close the unordered list
                $tweetList.append('</ul>');
               });
        });
    }
})(jQuery);