<!DOCTYPE html>
<?php $url = 'https://genwebv4.upc.edu/camins'; ?>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Genweb3 to Genweb4 helper</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="<?php echo $url; ?>/++genwebupc++stylesheets/genwebupc.css">
    <link rel="stylesheet" href="<?php echo $url; ?>/dynamic.css">
</head>
<body style="background-color:#eee">
    <h1>Genweb3 to Genweb4 helper</h1>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    <script src="js/migrate.js"></script>
    <script>
      $(function() {
          $('#btn-migrate').click(function() {
              var $gw3 = $('<div/>').html($('#text-gw3').val());
              var $gw4 = gw4e_migrate($gw3);
              $('#text-gw4').val($gw3.html());
              $('#content').html($gw3.html());
              gw4e_translate_images('<?php echo $url; ?>', $('#content'));
          });
      });
    </script>
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span5">
                <h2>Genweb 3</h2>
                <textarea id="text-gw3" class="form-control" rows="10"></textarea>
            </div>
            <div class="span2">
                <p class="text-center" style="vertical-align: middle;"><button id="btn-migrate">Migrate</button></p>
            </div>
            <div class="span5">
                <h2>Genweb 4</h2>
                <textarea id="text-gw4" class="form-control" rows="10"></textarea>
            </div>
        </div>
    </div>
    <div class="container" style="width:100%; max-width:1200px !important">
        <div class="row-fluid">
            <div class="span2">
            </div>
            <div class="span10">
              <h2>Preview</h2>
              <div id="content" style="background-color:#fff; min-height:30em; padding:1em; margin:1em; border:solid #ccc thin">
              </div>
            </div>
        </div>
    </div>
</body>
</html>
