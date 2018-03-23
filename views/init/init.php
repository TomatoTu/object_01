<?php
$this->title = '刺猬智能建站系统';
?>
<div id="init">
    
</div>
<div class="pop_load_notice_b" style="display:none;" id="showwaitlong">
    <div class="pop_load_notice_in">
        <div class="mask_x"></div>
        <div class="load_con clearfix">
            <div class="load_img"><img src="/images/loading.gif"></div>
            <div class="load_text">
               <h3>温馨提示</h3>
                <p>页面正在初始化，时间可能比较长，请耐心等待......</p>
            </div>
        </div>
    </div>
</div>
<script>

var thisData = <?= $model?>;

</script>

<?php
    $this->registerJsFile('/js/theme.js', ['type'=>"text/babel"]);
?>