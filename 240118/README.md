
<table class="tg">
<thead>
  <tr>
    <th class="tg-nrix">기능</th>
    <th class="tg-nrix">URL-Mapping</th>
    <th class="tg-nrix">Method</th>
    <th class="tg-nrix">URL Params</th>
    <th class="tg-nrix">Data Params</th>
    <th class="tg-nrix">Success Response</th>
    <th class="tg-nrix">Error Response</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-cly1">정답 입력</td>
    <td class="tg-cly1">/answer</td>
    <td class="tg-cly1">GET</td>
    <td class="tg-cly1">None</td>
    <td class="tg-7zrl">[{<br>"quizId" : 0, int<br>"userAnswer" : "정답", String<br>}]</td>
    <td class="tg-cly1">정답 맞았을 때<br><br>[{<br>"answer" : true, boolean<br>}]</td>
    <td class="tg-cly1">정답 틀렸을 때<br><br>[{<br>"answer" : false, boolean<br>}]</td>
  </tr>
  <tr>
    <td class="tg-cly1">문제 로드(고요)</td>
    <td class="tg-cly1">/quiz</td>
    <td class="tg-cly1">GET</td>
    <td class="tg-cly1">None</td>
    <td class="tg-7zrl">[{<br>"gameCategory" : 0, int<br>"quizCategory" :&nbsp;&nbsp;0, int<br>}]</td>
    <td class="tg-cly1">문제 로딩 성공<br><br>[{<br>"problems" : List&lt;problem&gt;, List<br>}]</td>
    <td class="tg-cly1">문제 로딩 실패<br><br>[{<br>"problems" :Collections.emptyList(), List<br>}]</td>
  </tr>
  <tr>
    <td class="tg-cly1">문제 로드(연예인)</td>
    <td class="tg-cly1">/quiz</td>
    <td class="tg-cly1">GET</td>
    <td class="tg-cly1">None</td>
    <td class="tg-7zrl">[{<br>"gameCategory" : 0, int<br>"quizCategory" :&nbsp;&nbsp;0, int<br>}]</td>
    <td class="tg-cly1">문제 로딩 성공<br><br>[{<br>"problems" : List(&lt;problem&gt;, List<br>}]</td>
    <td class="tg-cly1">문제 로딩 실패<br><br>[{<br>"problems" : Collections.emptyList(), List<br>}]</td>
  </tr>
  <tr>
    <td class="tg-cly1">게임 점수 저장</td>
    <td class="tg-cly1">/score</td>
    <td class="tg-cly1">POST</td>
    <td class="tg-cly1">None</td>
    <td class="tg-7zrl">[{<br>"user1" : 0, int<br>"user2" : 0, int<br>"user3" : 0, int<br>"user4" : 0, int<br>"gameCategory" :&nbsp;&nbsp;0, int<br>"winnerScore" :&nbsp;&nbsp;0, int<br>"teamPhoto" : "사진경로", String<br>}]</td>
    <td class="tg-cly1">저장 성공<br><br>[{<br>"result" : true, boolean<br>}]</td>
    <td class="tg-cly1">저장 실패<br><br>[{<br>"result" : false, boolean<br>}]</td>
  </tr>
</tbody>
</table>
