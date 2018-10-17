
var table = {}
var beginings = {}
var s = 8


$.ajax({
  url: "https://gracefkang.github.io/t9.shakespeare.txt",
  dataType: "text",
  success : function(data) {
    processTweets(data.split('\n'));
  }
});



function processTweets (tweets) {
  // console.log(tweets.length)
  table = {}
  beginings = {}
  tweets.forEach(function(t){processTweet(t)})
  generateWord(140)
}

function processTweet (tweet) {
  // console.log(tweet)
  var key, next
  for (var i = 0; i < tweet.length - s - 1; i ++) {
    key = tweet.slice(i, i + s)
    next = tweet.slice(i + s, i + s + 1)
    if(table[key] === undefined) table[key]  = []
    table[key].push(next)
    if(i === 0){
      if(beginings[key] === undefined) beginings[key] = []
      beginings[key].push(next)
    }
  }
}

function generateWord (len) {
  var k = Object.keys(beginings), n, l
  var msg = k[Math.round(Math.random() * k.length)]
  console.log(msg)

  var node = document.createElement("blockquote");
  node.className = 'twitter-tweet'
  k = Object.keys(table)

  for (var i = 0; i < len; i ++) {
    l = msg.substr(-s)
    n = table[l]
    if (n === undefined) {
      break;
      // node.innerHTML = msg;
      // document.getElementById("list").appendChild(node);
      // return msg
    }
    msg += n[Math.floor(Math.random() * n.length)]
  }
  // return(msg)
  node.innerHTML = '<div class="img"/></div><p>' + msg + "</p>";
  var list = document.getElementById("list")
  list.insertBefore(node, list.firstChild);
  // document.getElementById("list").appendChild(node);
}
