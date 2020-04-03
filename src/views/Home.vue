<template>
    <v-container class='background' fluid>
        <v-row justify='center' class='page-row'>
            <v-col class='page-col' cols=8>
                <div class='page-body'
                v-bar="{preventParentScroll: true, scrollThrottle: 30}">
                    <div>
                        Text<br/>
                        Text<br/>
                        Text<br/>
                        Text<br/>
                        Text<br/>
                        Text<br/>
                        Text<br/>
                        Text<br/>
                        Text<br/>
                        Text<br/>
                        Text<br/>
                        Text<br/>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<style >
.background {
    height: 100%;
    padding: 0px;
    background-color: #eeeeee;
}

.page-row {
    padding: 20px;
    height: 89vh;
}

.page-col {
    height: 100%;
    background-color: white;
    padding-top: 0px;
    padding-bottom: 0px;
}

.page-body {
    height: 100%;
    overflow-y: auto;
}

.vb > .vb-dragger {
    z-index: 5;
    width: 15px;
    right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    transition:
        background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
    background-color: rgba(255, 0, 0, 0.877);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(189, 189, 189, 0.7);
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(189, 189, 189, 0.7);
}
</style>