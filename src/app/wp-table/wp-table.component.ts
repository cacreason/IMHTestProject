/**
 * Chris Creason - IMH Test Project
 * 2/8/22
 * Wordpress Post Table Component
 */
import { Component, OnInit, AfterViewInit,TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { GetWpDataService } from '../services/get-wp-data.service';
import { WpPost } from '../interfaces/wp-post';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-wp-table',
  templateUrl: './wp-table.component.html',
  styleUrls: ['./wp-table.component.css']
})
export class WpTableComponent implements OnInit {
  // Reference to Table paginator component
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Reference to wordpress post card overlay template
  @ViewChild('templatePortalContent') templatePortalContent!: TemplateRef<unknown>;

  // Array to store Wordpress Posts retrieved from API
  wpPosts: WpPost[] = Array<WpPost>();

  // Property to store the specific wordpress post selected on table click
  activePost!: WpPost;
  displayedColumns: string[] = ['id', 'slug', 'status', 'title', 'dateCreated'];

  // Stores data array used to create the material table and includes support for pagination
  dataSource!: MatTableDataSource<WpPost>;
  overlayRef: OverlayRef | undefined;
  templatePortal: TemplatePortal | undefined;

  constructor(private wpDataService: GetWpDataService, public overlay: Overlay, private _viewContainerRef: ViewContainerRef) { }
  ngOnInit(): void {
    this.renderTableRows();
  }

  /**
   * Method used to configure template portal used to display card overlay on table row click
   */
  ngAfterViewInit(): void{
    this.templatePortal = new TemplatePortal(
    this.templatePortalContent,
    this._viewContainerRef);
  }

  /**
   * Method used to retrieve data from Wordpress API via wpDataService and update dataSource property used to render table rows and paginator.
   */
  renderTableRows(): void {
    this.wpDataService.getWpData()
    .subscribe((wpPosts: any)=>{
      this.wpPosts = wpPosts;
      this.dataSource = new MatTableDataSource<WpPost>(wpPosts);
      this.dataSource.paginator = this.paginator;
    });
  }

  /**
   * Method used to render an overlay card containing Wordpress post content
   * @param wpPost 
   */
  openPostModal(wpPost:WpPost): void {
    this.activePost = wpPost;
      // Create the overlay
      this.overlayRef = this.overlay.create({
        hasBackdrop : true
      });
      // Create a portal to render wordpress post template content in
      const templatePortal = new TemplatePortal(this.templatePortalContent, this._viewContainerRef);
      // Append custom CSS class
      this.overlayRef.addPanelClass("wpPostOverlay");
      // Render the portal in the overlay
      this.overlayRef.attach(templatePortal);
      // Provide callback to backdrop click handler that destroys the overlay.
      this.overlayRef.backdropClick().subscribe(()=>{this.overlayRef?.dispose()});
  }

  closePostModal(): void {
    this.overlayRef?.dispose();
  }
}