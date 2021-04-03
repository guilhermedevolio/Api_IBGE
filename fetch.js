$.ajax({
    type: 'GET',
    url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/',
    success: function(callback) {
        showEstados(callback);
    }
})


function showEstados(estados) {
    estados.forEach(element => {
        $('#selectEstados').append('<option selected>' + element.sigla + '</option>');
    });
}

$('#selectEstados').on('change', function() {
    var estado = $('#selectEstados option:selected').val();
    var table = $('#datatable').DataTable();
    table.destroy();
    $('#datatable').DataTable({
        "ajax": {
            "url": "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + estado + '/municipios',
            "dataSrc": ""
        },
        "columns": [{
                "data": "id"
            },
            {
                "data": "nome"
            },
            {
                "data": "microrregiao.nome"
            },
            {
                "mRender": function(data, type, full) {
                    return '<p class="btn btn-success btn-sm" id="btn-view" val=' + full['id'] + '>' + 'Ver Detalhes' + '</p>';
                }
            }
        ]
    })

    $('.tabela').show();
    $('.alert').hide();

})



$(document).on('click', '#btn-view', function() {
    var city_id = $(this).attr('val');
    $.ajax({
        url: 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios/' + city_id,
        type: 'GET',
        success: function(callback) {
            $('#cityName').html(callback.nome);
            $('#cityMicro').html(callback.microrregiao.mesorregiao.nome);
            $('#cityUF').html(callback.microrregiao.mesorregiao.UF.nome);
            $('#cityRegion').html(callback.microrregiao.mesorregiao.UF.regiao.nome);
            $('#city_modal').modal('show');
        }
    })

});