/**
 * Calculate class
 * 
 * @package com.hoperun.util
 * @author kenny
 */
if (!com.hoperun.util.Calculate) {

    //BUG������ô�죿��������

    var expression = new Array();//��׺���ʽ
    var postexpression = new Array();//��ż�������
    var opexpression = new Array();//��������
    var stexpression = new Array();//��׺����
    //�����ַ���ֵ
    var expc = {
        ex: expression,
        index: 0,
        totallength: 0
    }
    //�����ֵ������
    var postexp = {
        pe: postexpression,
        index: 0,
        totallength: 0
    }
    //��Ų�����������
    var op = {
        ope: opexpression,
        top: -1
    }
    //�Ӻ�׺���ʽ���м���
    var st = {
        data: stexpression,
        top: -1,
        result: 0,
        numa: 0,
        numb: 0,
        tempresult: 0,
        intnum: 0, //�����������
        decimals: 0,   //���С������
        point: ''//���С����
    }

    com.hoperun.util.Calculate = {
        calculater: function (caluclateExprssion) {
            this.initialCalculater();
            for (var i = 0; i < caluclateExprssion.length; i++) {
                expression[expression.length] = caluclateExprssion.substr(i, 1)
            }
            expc.totallength = caluclateExprssion.length;
            while (expc.index < expc.totallength) {
                switch (expc.ex[expc.index]) {
                    case '(':
                        op.top++;
                        op.ope[op.top] = expc.ex[expc.index];
                        expc.index++;
                        break;
                    case ')':
                        while (op.ope[op.top] != '(') {
                            postexp.pe[postexp.index++] = op.ope[op.top];
                            op.top--;
                        }
                        op.top--;
                        expc.index++;
                        break;
                    case '+':
                    case '-':
                        while (op.top != -1 && op.ope[op.top] != '(') {
                            postexp.pe[postexp.index++] = op.ope[op.top];
                            op.top--;
                        }
                        op.top++;
                        op.ope[op.top] = expc.ex[expc.index];
                        expc.index++;
                        break;
                    case '*':
                    case '/':
                        while (op.ope[op.top] == "*" || op.ope[op.top] == "/") {
                            postexp.pe[postexp.index] = op.ope[op.top];
                            op.top--;
                        }
                        op.top++;
                        op.ope[op.top] = expc.ex[expc.index];
                        expc.index++;
                        break;
                    case ' ': break;
                    default:
                        while ((expc.ex[expc.index] >= '0' && expc.ex[expc.index] <= '9') || (expc.ex[expc.index] == '.')) {
                            postexp.pe[postexp.index++] = expc.ex[expc.index]
                            expc.index++;
                        }
                        postexp.pe[postexp.index++] = '#';
                } //switch
            } //while
            while (op.top != -1) {
                postexp.pe[postexp.index++] = op.ope[op.top];
                op.top--;
            }
            postexp.totallength = postexp.pe.length;
            var s = "";

            for (var i = 0; i < postexp.totallength; i++)
                s = s + postexp.pe[i];
            expc.ex.length = 0;
            expc.index = 0;
            expc.totallength = 0;
            op.ope.length = 0;
            op.top = -1;
            postexp.index = 0;
            //����ֵ��


            while (postexp.index < postexp.totallength) {
                switch (postexp.pe[postexp.index]) {
                    case '+':
                        st.numa = st.data[st.top];
                        st.top--;
                        st.numb = st.data[st.top];
                        st.top--;
                        st.result = parseFloat(st.numa) + parseFloat(st.numb);
                        st.top++;
                        st.data[st.top] = st.result;
                        break;
                    case '-':
                        st.numa = st.data[st.top];
                        st.top--;
                        st.numb = st.data[st.top];
                        st.top--;
                        st.result = parseFloat(st.numb) - parseFloat(st.numa);
                        st.top++;
                        st.data[st.top] = st.result;
                        break;
                    case '*':
                        st.numa = st.data[st.top];
                        st.top--;
                        st.numb = st.data[st.top];
                        st.top--;
                        st.result = parseFloat(st.numb) * parseFloat(st.numa);
                        st.top++;
                        st.data[st.top] = st.result;
                        break;
                    case '/':
                        st.numa = st.data[st.top];
                        st.top--;
                        st.numb = st.data[st.top];
                        st.top--;
                        if (st.numa != 0) {
                            st.result = parseFloat(st.numb) / parseFloat(st.numa);
                            st.top++;
                            st.data[st.top] = st.result;
                        }
                        else {
                            alert("�������������������������");
                        }
                        break;
                    default:
                        st.tempresult = 0;
                        while ((postexp.pe[postexp.index] >= '0' && postexp.pe[postexp.index] <= '9') || (postexp.pe[postexp.index] == '.')) {
                            if (postexp.pe[postexp.index] == '.') {
                                postexp.index++;
                                st.point = '.';
                                while (postexp.pe[postexp.index] >= '0' && postexp.pe[postexp.index] <= '9') {
                                    st.decimals = 10 * st.decimals + parseFloat(postexp.pe[postexp.index]);
                                    postexp.index++;
                                }
                            }
                            else {
                                st.intnum = 10 * st.intnum + parseFloat(postexp.pe[postexp.index]);
                                postexp.index++;
                            }
                        }
                        if (st.point == '.') {
                            var a = st.intnum + "";
                            var b = st.decimals + "";
                            var temp = a + st.point + b;
                            st.tempresult = parseFloat(temp);
                        }
                        else {
                            st.tempresult = st.intnum;
                        }
                        st.decimals = 0;
                        st.intnum = 0;
                        st.point = '';
                        st.top++;
                        st.data[st.top] = st.tempresult;
                        break;

                }
                postexp.index++
            }
            //document.getElementById('result').innerHTML = st.data[st.top];
            return st.data[st.top];
        },
        initialCalculater: function () {
            postexp.pe.length = 0;
            postexp.index = 0;
            postexp.totallength = 0;
            st.data.length = 0;
            st.decimals = 0;
            st.intnum = 0;
            st.numa = 0;
            st.numb = 0;
            st.point = '';
            st.result = 0;
            st.top = -1;

        }
    };
}