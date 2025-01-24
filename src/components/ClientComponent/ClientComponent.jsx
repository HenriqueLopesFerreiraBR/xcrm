import React from "react";

// import { Container } from './styles';

function ClientComponent() {
    return (
        <div className="clientComponent">
            <div class="page-titles">
                <ol class="breadcrumb">
                    <li>
                        <h5 class="bc-title">Gerenciar Cliente</h5>
                    </li>

                    <li class="breadcrumb-item active">
                        <a href="/">Gerenciar Cliente</a>
                    </li>
                </ol>
                <a
                    class="text-primary fs-13"
                    data-bs-toggle="offcanvas"
                    href="#offcanvasExample1"
                    role="button"
                    aria-controls="offcanvasExample1"
                >
                    + Adicionar Tarefa
                </a>
            </div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="card">
                            <div class="card-body p-0">
                                <div class="table-responsive active-projects manage-client">
                                    <div class="tbl-caption">
                                        <h4 class="heading mb-0">
                                            Gerenciar Cliente
                                        </h4>
                                    </div>
                                    <table id="reports-tbl" class="table">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Usuário</th>
                                                <th>Contato</th>
                                                <th>Gênero</th>
                                                <th>Localização</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="products">
                                                        <img
                                                            src="images/contacts/pic2.jpg"
                                                            class="avatar avatar-md"
                                                            alt=""
                                                        />
                                                        <div>
                                                            <h6>
                                                                Ricky Antony
                                                            </h6>
                                                            <span>
                                                                Designer Web
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span class="text-primary">
                                                        ricky.antony
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>
                                                        +91 123 456 7890
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>Masculino</span>
                                                </td>
                                                <td>
                                                    <span>Reino Unido</span>
                                                </td>
                                                <td>
                                                    <span class="badge badge-success light border-0">
                                                        Ativo
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="products">
                                                        <img
                                                            src="images/contacts/pic2.jpg"
                                                            class="avatar avatar-md"
                                                            alt=""
                                                        />
                                                        <div>
                                                            <h6>Nelson</h6>
                                                            <span>
                                                                Diretor
                                                                Comercial
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span class="text-primary">
                                                        Nelson.antony
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>
                                                        +91 123 456 7890
                                                    </span>
                                                </td>
                                                <td>
                                                    <span>Masculino</span>
                                                </td>
                                                <td>
                                                    <span>Brasil</span>
                                                </td>
                                                <td>
                                                    <span class="badge badge-success light border-0">
                                                        Ativo
                                                    </span>
                                                </td>
                                            </tr>
                                            {/* <!-- Continue com o mesmo padrão para as demais linhas --> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientComponent;
